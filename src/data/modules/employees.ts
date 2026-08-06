import { ModuleMetadata } from '@/types/metadata';

export const employeesMockData = [
  { id: 201, fullName: 'Morne Morkel', jobTitle: 'Principal Architect', department: 'Engineering', email: 'morne.morkel@key360.com', phone: '+1 (555) 234-5678', salary: 165000, joinDate: '2021-03-15', status: 'Active', skills: ['React', 'Syncfusion', 'C#', '.NET Core', 'Azure'], pdfDocument: '/docs/employee-resume-sarah.pdf' },
  { id: 202, fullName: 'Ariana Grande', jobTitle: 'Senior Cloud Engineer', department: 'DevOps', email: 'ariana.grande@key360.com', phone: '+1 (555) 345-6789', salary: 140000, joinDate: '2022-06-01', status: 'Active', skills: ['Kubernetes', 'Terraform', 'Docker', 'AWS'], pdfDocument: '/docs/employee-resume-alex.pdf' },
  { id: 203, fullName: 'Rajvi Prajapati', jobTitle: 'Lead UI/UX Architect', department: 'Frontend Architecture', email: 'rajvi.prajapati@key360.com', phone: '+1 (555) 456-7890', salary: 155000, joinDate: '2023-01-10', status: 'Active', skills: ['Next.js', 'TypeScript', 'Syncfusion', 'TailwindCSS', 'System Architecture'], pdfDocument: '/docs/employee-resume-rajvi.pdf' },
  { id: 204, fullName: 'Michael Chang', jobTitle: 'Product Manager', department: 'Product', email: 'michael.chang@key360.com', phone: '+1 (555) 567-8901', salary: 135000, joinDate: '2020-09-15', status: 'Active', skills: ['Product Strategy', 'Agile', 'Scrum', 'Analytics'], pdfDocument: '/docs/employee-resume-michael.pdf' },
  { id: 205, fullName: 'Elena Rostova', jobTitle: 'Director of Information Security', department: 'Security', email: 'elena.rostova@key360.com', phone: '+1 (555) 678-9012', salary: 175000, joinDate: '2019-11-20', status: 'Active', skills: ['SOC2', 'Penetration Testing', 'Compliance', 'ISO 27001'], pdfDocument: '/docs/employee-resume-elena.pdf' }
];

export const employeesMetadata: ModuleMetadata = {
  id: 'employees',
  name: 'Employees Directory',
  description: 'Manage workforce profiles, department assignments, skill tags, resume document previews, and compensation.',
  icon: 'Users',
  provider: 'mock',
  permissions: ['create', 'edit', 'delete', 'export'],
  mockData: employeesMockData,
  fields: [
    { key: 'id', label: 'Emp ID', controlType: 'number', showInGrid: true, showInForm: false, frozen: true, width: 90 },
    { key: 'fullName', label: 'Full Name', controlType: 'text', placeholder: 'e.g. Morne Morkel', validation: { required: true }, showInGrid: true, showInForm: true, allowSorting: true, allowFiltering: true },
    { key: 'jobTitle', label: 'Job Title', controlType: 'text', showInGrid: true, showInForm: true, allowFiltering: true },
    {
      key: 'department', label: 'Department', controlType: 'select', options: [
        { label: 'Engineering', value: 'Engineering' },
        { label: 'DevOps', value: 'DevOps' },
        { label: 'Frontend Architecture', value: 'Frontend Architecture' },
        { label: 'Product', value: 'Product' },
        { label: 'Security', value: 'Security' }
      ], showInGrid: true, showInForm: true, groupable: true
    },
    { key: 'email', label: 'Work Email', controlType: 'email', placeholder: 'user@key360.com', showInGrid: true, showInForm: true },
    { key: 'phone', label: 'Phone Number', controlType: 'phone', placeholder: '+1 (555) 000-0000', showInGrid: true, showInForm: true },
    { key: 'salary', label: 'Annual Compensation ($)', controlType: 'currency', format: 'C0', showInGrid: true, showInForm: true, aggregate: 'average' },
    { key: 'skills', label: 'Technical Skills', controlType: 'tags', showInGrid: true, showInForm: true },
    { key: 'joinDate', label: 'Date Joined', controlType: 'date', showInGrid: true, showInForm: true, format: 'yyyy-MM-dd' },
    { key: 'pdfDocument', label: 'Resume / Document Upload', controlType: 'fileupload', showInGrid: false, showInForm: true }
  ],
  views: [
    {
      id: 'v-grid',
      name: 'Employee Directory',
      type: 'grid',
      icon: 'Table',
      widgets: [
        {
          id: 'w-emp-grid',
          title: 'Employee Profiles DataGrid',
          type: 'grid',
          gridConfig: {
            virtualScrolling: true,
            allowPaging: true,
            pageSize: 25,
            allowSorting: true,
            allowFiltering: true,
            allowGrouping: true,
            allowColumnChooser: true,
            allowExcelExport: true,
            allowPdfExport: true,
            frozenColumns: 1
          }
        }
      ]
    },
    {
      id: 'v-pdf',
      name: 'Document / Resume Viewer',
      type: 'pdf',
      icon: 'FileText',
      widgets: [
        {
          id: 'w-pdf-viewer',
          title: 'Employee Resume Inspection',
          type: 'pdf',
          pdfUrl: '/sample.pdf'
        }
      ]
    },
    {
      id: 'v-form',
      name: 'Onboard Employee Form',
      type: 'form',
      icon: 'UserPlus',
      widgets: [
        {
          id: 'w-emp-form',
          title: 'Employee Registration Form',
          type: 'form'
        }
      ]
    }
  ]
};
