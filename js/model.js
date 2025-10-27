const Model = (() => {
  const getEmployees = () => JSON.parse(localStorage.getItem("employees") || "[]");

  const saveEmployees = (employees) => localStorage.setItem("employees", JSON.stringify(employees));

  const addEmployee = (employee) => {
    const employees = getEmployees();
    employee.id = Date.now();
    employees.push(employee);
    saveEmployees(employees);
  };

  const updateEmployee = (id, updatedData) => {
    const employees = getEmployees().map(emp => emp.id === id ? { ...emp, ...updatedData } : emp);
    saveEmployees(employees);
  };

  const deleteEmployee = (id) => {
    const employees = getEmployees().filter(emp => emp.id !== id);
    saveEmployees(employees);
  };

  const getAttendance = () => JSON.parse(localStorage.getItem("attendance") || "{}");

  const saveAttendance = (attendance) => localStorage.setItem("attendance", JSON.stringify(attendance));

  const markAttendance = (date, empId, status) => {
    const attendance = getAttendance();
    if (!attendance[date]) attendance[date] = {};
    attendance[date][empId] = status;
    saveAttendance(attendance);
  };

  const getPerformance = () => JSON.parse(localStorage.getItem("performance") || "{}");

  const savePerformance = (performance) => localStorage.setItem("performance", JSON.stringify(performance));

  const addPerformance = (empId, record) => {
    const performance = getPerformance();
    if (!performance[empId]) performance[empId] = [];
    performance[empId].push(record);
    savePerformance(performance);
  };

  return {
    getEmployees,
    addEmployee,
    updateEmployee,
    deleteEmployee,
    getAttendance,
    markAttendance,
    getPerformance,
    addPerformance
  };
})();
