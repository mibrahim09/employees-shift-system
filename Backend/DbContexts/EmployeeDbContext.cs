using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

#nullable disable

namespace ShiftSystem.DbContexts
{
    public partial class EmployeeDbContext : DbContext
    {

        public EmployeeDbContext(DbContextOptions<EmployeeDbContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Employee> Employees { get; set; }
        public virtual DbSet<Shift> Shifts { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Employee>(entity =>
            {
                entity.ToTable("employees");

                entity.Property(e => e.Id).HasColumnType("int(11)");

                entity.Property(e => e.Name).HasMaxLength(255);
            });

            modelBuilder.Entity<Shift>(entity =>
            {

                entity.ToTable("shifts");

                entity.Property(e => e.EmployeeId).HasColumnType("int(11)");

                entity.Property(e => e.ShiftId).HasColumnType("int(11)");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
