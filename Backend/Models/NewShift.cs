using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ShiftSystem.Models
{
    public class NewShift
    {
        public int ShiftId { get; set; }
        public string EmployeeId { get; set; }
        public DateTime Date { get; set; }
        public string StartTime { get; set; }
        public string EndTime { get; set; }
        public DateTime ShiftStart
        {
            get
            {
                var start = StartTime.Split(':');
                var startHour = int.Parse(start[0]);
                var startMinute = int.Parse(start[1]);
                return new DateTime(Date.Year, Date.Month, Date.Day, startHour, startMinute, 0);
            }
        }
        public DateTime ShiftEnd
        {
            get
            {
                var end = EndTime.Split(':');
                var endHour = int.Parse(end[0]);
                var endMinute = int.Parse(end[1]);
                return new DateTime(Date.Year, Date.Month, Date.Day + (int)(endHour < ShiftStart.Hour ? 1 : 0), endHour, endMinute, 0);
            }
        }
    }
}
