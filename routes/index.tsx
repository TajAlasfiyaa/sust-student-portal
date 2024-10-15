// src/routes/index.tsx
import { h } from "preact";
import StudentForm from "../components/StudentForm.tsx";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Student Registration</h1>
      <StudentForm />
    </div>
  );
};

export default Home;
