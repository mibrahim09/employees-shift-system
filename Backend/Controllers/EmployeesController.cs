using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Sockets;
using System.Threading.Tasks;
using ShiftSystem.DbContexts;
using ShiftSystem.Dtos;
using ShiftSystem.Models;
using Microsoft.AspNetCore.Mvc;
using AutoMapper;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using Microsoft.Extensions.Configuration;
using System.Security.Claims;
// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ShiftSystem.Controllers
{
    [Route("api/employees")]
    [ApiController]
    public class EmployeesController : ControllerBase
    {
        private readonly EmployeeDbContext _context;
        private readonly IMapper _mapper;
        private IConfiguration _config;
        public EmployeesController(EmployeeDbContext context, IMapper mapper, IConfiguration config)
        {
            _context = context;
            _mapper = mapper;
            _config = config;
        }
        [HttpPost]
        public IActionResult Post([FromBody] NewEmployeeDto newEmployee)
        {
            var newEmployeeDto = _mapper.Map<Employee>(newEmployee);
            var result = _context.Add(newEmployeeDto);
            _context.SaveChanges();
            return Ok(newEmployeeDto);
        }
    }
}
