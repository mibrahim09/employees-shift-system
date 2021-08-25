using System;
using System.Collections.Generic;

#nullable disable

namespace ShiftSystem.DbContexts
{
    public partial class Shift
    {
        public int? ShiftId { get; set; }
        public int EmployeeId { get; set; }
        public DateTime? Date { get; set; }
        public string StartTime { get; set; }
        public string EndTime { get; set; }
        public string DayOfWeek { get { return Date.Value.DayOfWeek.ToString(); } }
        public bool IsEditable
        {
            get
            {
                return (DateTime.Now < ShiftStart);
            }
        }
        public DateTime ShiftStart
        {
            get
            {
                var start = StartTime.Split(':');
                var startHour = int.Parse(start[0]);
                var startMinute = int.Parse(start[1]);
                return new DateTime(Date.Value.Year, Date.Value.Month, Date.Value.Day, startHour, startMinute, 0);
            }
        }
        public DateTime ShiftEnd
        {
            get
            {
                var end = EndTime.Split(':');
                var endHour = int.Parse(end[0]);
                var endMinute = int.Parse(end[1]);
                return new DateTime(Date.Value.Year, Date.Value.Month, Date.Value.Day + (int)(endHour < ShiftStart.Hour ? 1 : 0), endHour, endMinute, 0);
            }
        }
    }
}
