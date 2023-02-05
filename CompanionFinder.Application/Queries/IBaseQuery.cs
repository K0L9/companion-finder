﻿namespace CompanionFinder.Application.Queries
{
    public interface IBaseQuery<TEntity, TIdType>
    {
        IQueryable<TEntity> GetAll();

        Task<TEntity> GetByIdAsync(TIdType id);
    }
}
