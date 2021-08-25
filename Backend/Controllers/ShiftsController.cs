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
    [Route("api/shifts")]
    [ApiController]
    public class ShiftsController : ControllerBase
    {
        private readonly EmployeeDbContext _context;
        private readonly IMapper _mapper;
        private IConfiguration _config;
        public ShiftsController(EmployeeDbContext context, IMapper mapper, IConfiguration config)
        {
            _context = context;
            _mapper = mapper;
            _config = config;
        }
        [HttpDelete]
        [Route("{shiftId}")]
        public IActionResult Delete(int shiftId)
        {
            var result = _context.Shifts.Where(e => e.ShiftId == shiftId).FirstOrDefault();
            if (result == null) return NotFound();

            _context.Shifts.Remove(result);
            _context.SaveChanges();
            return Ok();
        }
        [HttpGet]
        public IActionResult Get()
        {
            //var result = (from e in _context.Employees
            //              join shifts in _context.Shifts on e.Id equals shifts.EmployeeId
            //              select new
            //              {
            //                  EmployeeId = e.Id,
            //                  EmployeeName = e.Name,
            //                  ShiftId = shifts.ShiftId,
            //                  Date = shifts.Date,
            //                  ShiftStartTime = shifts.StartTime,
            //                  ShiftEndTime = shifts.EndTime,
            //                  CanEdit = isEditable(shifts.Date,
            //                                      shifts.StartTime,
            //                                      shifts.EndTime)
            //              }).ToList();

            var result = _context.Employees
                .ToList()
                .GroupJoin(
                _context.Shifts,
                emp => emp.Id,
                shifts => shifts.EmployeeId,
                (emp, shifts) => new
                {
                    employeeName = emp.Name,
                    employeeId = emp.Id,
                    employeeShifts = shifts
                });
            return Ok(result.ToList());
        }
        [HttpPost]
        public IActionResult Post([FromBody] NewShift newShift)
        {
            var employee = _context.Employees.Where(e => e.Id == int.Parse(newShift.EmployeeId)).ToList();
            if (employee.Count() == 0) return NotFound("Cannot find this employee.");

            var shifts = _context.Shifts.Where(e => e.EmployeeId == int.Parse(newShift.EmployeeId));

            // TODO: VALIDATION HERE
            string shiftError;
            if (IsOverlapping(shifts.ToList(), newShift, out shiftError)) return BadRequest(shiftError);


            var shiftDb = _mapper.Map<Shift>(newShift);

            _context.Shifts.Add(shiftDb);
            _context.SaveChanges();

            return Ok(shiftDb);

        }

        private bool IsOverlapping(List<Shift> shifts, NewShift newShift, out string shiftError)
        {
            shiftError = "";
            foreach (var shift in shifts
                .Where(e => e.ShiftId != newShift.ShiftId
            && (e.Date.Value.Day == newShift.Date.Day)))
            {
                // Algorithm used : tStartA < tEndB && tStartB < tEndA;
                bool overlap = shift.ShiftStart < newShift.ShiftEnd && newShift.ShiftStart < shift.ShiftEnd;
                if (overlap)
                {
                    shiftError = $"Overlapping with the shift starting {shift.ShiftStart} and ending at {shift.ShiftEnd}";
                    return true;
                }
            }
            return false;

        }

        [HttpPost]
        [Route("edit/{shiftId}")]
        public IActionResult Post(int shiftId, [FromBody] NewShift newShift)
        {
            var shifts = _context.Shifts.Where(e => e.EmployeeId == int.Parse(newShift.EmployeeId));
            if (shifts.Count() == 0) return NotFound("No shifts found for this employee");

            var shift = shifts.Where(e => e.ShiftId == shiftId).FirstOrDefault();
            if (shift == null) return NotFound();

            var employeeId = shift.EmployeeId;
            newShift.ShiftId = shiftId;

            string shiftError;
            if (IsOverlapping(shifts.ToList(), newShift, out shiftError)) return BadRequest(shiftError);

            shift.StartTime = newShift.StartTime;
            shift.EndTime = newShift.EndTime;
            _context.SaveChanges();


            return Ok(shift);

        }
        private static bool isEditable(DateTime? date, string startTime, string endTime)
        {
            var start = startTime.Split(':');
            var startHour = int.Parse(start[0]);
            var startMinute = int.Parse(start[1]);

            var end = startTime.Split(':');
            var endHour = int.Parse(end[0]);
            var endMinute = int.Parse(end[1]);

            var startTimeStamp = new DateTime(date.Value.Year, date.Value.Month, date.Value.Day, startHour, startMinute, 0);
            var endTimeStamp = new DateTime(date.Value.Year, date.Value.Month, date.Value.Day + (int)(endHour < startHour ? 1 : 0), endHour, endMinute, 0);

            return (DateTime.Now < startTimeStamp);
        }


    }
}
