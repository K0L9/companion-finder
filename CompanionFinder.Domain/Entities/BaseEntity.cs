﻿using System.ComponentModel.DataAnnotations;

namespace CompanionFinder.Domain.Entities
{
    public interface IEntity<T>
    {
        T Id { get; set; }
        bool IsDeleted { get; set; }

    }
    public abstract class BaseEntity<T> : IEntity<T>
    {
        [Key]
        public T Id { get; set; }
        public bool IsDeleted { get; set; }
    }
}
