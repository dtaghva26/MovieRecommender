import numpy as np
def distance(u, v, degree):
    #find the movies that both of users rated
    mask = (~np.isnan(u)) & (~np.isnan(v))
    if mask.sum() == 0:
        return np.inf
    u = u[mask]
    v = v[mask]
    return np.sum(np.abs(u - v) ** degree) ** (1.0 / degree)