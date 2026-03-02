from distance import distance
def similarity(u, v, degree):
    dist = distance(u, v, degree)
    return 1.0 / (1.0 + dist)
