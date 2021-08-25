using AutoMapper;
using ShiftSystem.DbContexts;
using ShiftSystem.Dtos;
using ShiftSystem.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ShiftSystem
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<NewEmployeeDto, Employee>();
            CreateMap<Employee, NewEmployeeDto>();

            CreateMap<NewShift, Shift>();
            CreateMap<Shift, NewShift>();


        }
    }
}
