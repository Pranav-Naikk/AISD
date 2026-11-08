const db = require('../config/db');

exports.checkEligibility = async (studentId, jobId) => {
  const [[student]] = await db.query('SELECT * FROM students WHERE id = ?', [studentId]);
  const [[job]] = await db.query('SELECT * FROM job_listings WHERE id = ?', [jobId]);
  if (!student || !job) return { eligible: false, reasons: ['Student or job was not found.'] };
  const [branchRows] = await db.query('SELECT branch FROM job_allowed_branches WHERE job_id = ?', [jobId]);
  const reasons = [];
  if (!job.is_open) reasons.push('This job is closed.');
  if (Number(student.cgpa) < Number(job.min_cgpa)) reasons.push(`CGPA must be at least ${job.min_cgpa}.`);
  if (student.active_backlogs > job.max_backlogs) reasons.push(`Maximum allowed active backlogs is ${job.max_backlogs}.`);
  if (branchRows.length && !branchRows.some(row => row.branch === student.branch)) reasons.push(`This job is not open to the ${student.branch} branch.`);
  return { eligible: reasons.length === 0, reasons, student, job, allowedBranches: branchRows.map(r => r.branch) };
};
