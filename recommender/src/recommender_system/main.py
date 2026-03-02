import os
import requests
from dotenv import load_dotenv
import pandas as pd
load_dotenv()

API_KEY = os.getenv("API_KEY_TMBD")


def fetch_movie_tmdb_id(tmdb_id):
    url = f"https://api.themoviedb.org/3/movie/{tmdb_id}"

    params = {
        "api_key": API_KEY,
        "language": "en-US",
        "append_to_response": "keywords"
    }

    response = requests.get(url, params=params)

    if response.status_code != 200:
        return {
            "tmdb_id": tmdb_id,
            "status": "error",
            "error": response.text
        }

    data = response.json()

    # Extract keywords safely
    keywords_block = data.get("keywords", {})
    keywords_list = keywords_block.get("keywords", [])
    keywords = [k["name"] for k in keywords_list if k.get("name")]

    # Build structured result
    result = {
        "tmdb_id": tmdb_id,
        "title": data.get("title"),
        "overview": data.get("overview"),
        "release_date": data.get("release_date"),
        "runtime": data.get("runtime"),
        "popularity": data.get("popularity"),
        "vote_average": data.get("vote_average"),
        "vote_count": data.get("vote_count"),
        "genres": "|".join([g["name"] for g in data.get("genres", [])]),
        "keywords": "|".join(keywords),
        "poster_url": f"https://image.tmdb.org/t/p/w500{data['poster_path']}" if data.get("poster_path") else None,
        "text_for_nlp": (
            (data.get("overview") or "") +
            "\n\nKeywords: " + ", ".join(keywords)
        ).strip(),
        "status": "ok",
        "error": None
    }

    return result

file_path = '../../data/raw/ml-small/ml-latest-small/links.csv'
df = pd.read_csv(file_path)
import time

# 1) Clean tmdbId column (drop NaNs, make int)
df = df.dropna(subset=["tmdbId"]).copy()
df["tmdbId"] = df["tmdbId"].astype(int)

# Optional: limit for testing (remove later)
# df = df.head(50)

# 2) Resume support (skip already fetched tmdb_ids)
output_path = "tmdb_enriched.csv"

if os.path.exists(output_path):
    existing = pd.read_csv(output_path)
    done_tmdb_ids = set(existing.loc[existing["status"] == "ok", "tmdb_id"].astype(int).tolist())
    print(f"Resuming: {len(done_tmdb_ids)} movies already fetched.")
else:
    done_tmdb_ids = set()

results = []

# 3) Loop and fetch
cnt = 0
for i, row in df.iterrows():
    tmdb_id = int(row["tmdbId"])
    movie_id = int(row["movieId"])
    if cnt % 100 == 0:
        print(cnt)
    cnt += 1
    if tmdb_id in done_tmdb_ids:
        continue

    data = fetch_movie_tmdb_id(tmdb_id)

    # keep MovieLens mapping too (super useful later)
    data["movieId"] = movie_id

    results.append(data)

    # 4) Every N movies, flush to CSV so you never lose progress
    if len(results) >= 50:
        batch_df = pd.DataFrame(results)

        # Write header only if file doesn't exist yet
        write_header = not os.path.exists(output_path)
        batch_df.to_csv(output_path, mode="a", header=write_header, index=False)

        print(f"✅ Saved batch of {len(results)} movies (last tmdb_id={tmdb_id})")
        results = []

    # 5) Rate limit (safe)
    time.sleep(0.3)  # ~3.3 requests/sec

# Save any remaining rows
if results:
    batch_df = pd.DataFrame(results)
    write_header = not os.path.exists(output_path)
    batch_df.to_csv(output_path, mode="a", header=write_header, index=False)
    print(f"✅ Saved final batch of {len(results)} movies.")

print(f"🎬 Done. Output saved to: {output_path}")