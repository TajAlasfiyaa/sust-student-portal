// src/components/StudentForm.tsx
import { useSignal } from "@preact/signals";
import { h } from "preact";

// Define the state interface
interface StudentData {
  name: string;
  universityId: string;
  whatsapp: string;
  status: string;
  specialization: string;
  yearOfEntry: string;
  selectedSemesters: string[]; // Updated to string[]
  subjects: string[]; // Updated to string[]
  photo: File | null; // Updated to File | null
  examCenter: string;
}

const StudentForm = () => {
  // Use useSignal for state management
  const studentData = useSignal<StudentData>({
    name: "",
    universityId: "",
    whatsapp: "",
    status: "",
    specialization: "",
    yearOfEntry: "",
    selectedSemesters: [],
    subjects: [],
    photo: null,
    examCenter: "",
  });

  const handleChange = (e: Event) => {
    const target = e.target as HTMLInputElement | HTMLSelectElement;

    if (target instanceof HTMLSelectElement) {
      const values = Array.from(target.selectedOptions, (option) => option.value);
      studentData.value = { ...studentData.value, [target.name]: values };
    } else {
      const { name, value } = target;
      studentData.value = { ...studentData.value, [name]: value };
    }
  };

  const handleFileChange = (e: Event) => {
    const target = e.target as HTMLInputElement;
    const file = target.files ? target.files[0] : null;
    studentData.value = { ...studentData.value, photo: file };
  };

  const handleSubmit = (e: Event) => {
    e.preventDefault();
    // Submit form data to the server
    console.log("Student Data:", studentData.value);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-4 bg-white rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4">Student Registration Form</h2>

      {/* Name */}
      <div className="mb-4">
        <label className="block mb-1">Name</label>
        <input
          type="text"
          name="name"
          value={studentData.value.name}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 p-2 rounded"
        />
      </div>

      {/* University ID */}
      <div className="mb-4">
        <label className="block mb-1">University ID</label>
        <input
          type="text"
          name="universityId"
          value={studentData.value.universityId}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 p-2 rounded"
        />
      </div>

      {/* WhatsApp Phone Number */}
      <div className="mb-4">
        <label className="block mb-1">WhatsApp Phone Number</label>
        <input
          type="tel"
          name="whatsapp"
          value={studentData.value.whatsapp}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 p-2 rounded"
        />
      </div>

      {/* Student Status */}
      <div className="mb-4">
        <label className="block mb-1">Student Status</label>
        <select
          name="status"
          value={studentData.value.status}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 p-2 rounded"
        >
          <option value="">Select Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      {/* Specialization */}
      <div className="mb-4">
        <label className="block mb-1">Specialization</label>
        <input
          type="text"
          name="specialization"
          value={studentData.value.specialization}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 p-2 rounded"
        />
      </div>

      {/* Year of Entry */}
      <div className="mb-4">
        <label className="block mb-1">Year of Entry</label>
        <input
          type="number"
          name="yearOfEntry"
          value={studentData.value.yearOfEntry}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 p-2 rounded"
        />
      </div>

      {/* Select Semesters */}
      <div className="mb-4">
        <label className="block mb-1">Select Semesters</label>
        <select
          name="selectedSemesters"
          multiple
          value={studentData.value.selectedSemesters}
          onChange={handleChange}
          className="w-full border border-gray-300 p-2 rounded"
        >
          <option value="semester1">Semester 1</option>
          <option value="semester2">Semester 2</option>
          <option value="semester3">Semester 3</option>
          {/* Add more semesters as needed */}
        </select>
      </div>

      {/* Select Subjects */}
      <div className="mb-4">
        <label className="block mb-1">Select Subjects</label>
        <select
          name="subjects"
          multiple
          value={studentData.value.subjects}
          onChange={handleChange}
          className="w-full border border-gray-300 p-2 rounded"
        >
          <option value="subject1">Subject 1</option>
          <option value="subject2">Subject 2</option>
          <option value="subject3">Subject 3</option>
          {/* Add more subjects as needed */}
        </select>
      </div>

      {/* Upload Photo */}
      <div className="mb-4">
        <label className="block mb-1">Upload Photo (optional)</label>
        <input
          type="file"
          name="photo"
          onChange={handleFileChange}
          className="w-full border border-gray-300 p-2 rounded"
        />
      </div>

      {/* Exam Center */}
      <div className="mb-4">
        <label className="block mb-1">Exam Center</label>
        <select
          name="examCenter"
          value={studentData.value.examCenter}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 p-2 rounded"
        >
          <option value="">Select Exam Center</option>
          <option value="center1">Center 1</option>
          <option value="center2">Center 2</option>
          <option value="center3">Center 3</option>
          {/* Add more exam centers as needed */}
        </select>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
      >
        Submit
      </button>
    </form>
  );
};

export default StudentForm;
