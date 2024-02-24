import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import {useAppContext} from "../context/Context"
import { Loader } from "../components";
import CourseTable from "./CoursesTable"
import NotFoundPage from "./NotFoundPage";

export default function StudentPage() {
  const { studentId: id } = useParams();
  const {records, addCourse, loading, wallet} = useAppContext()

  const [student ,setStudent] = useState({})
  useEffect(()=>{
      setStudent(records.find((s)=>s.studentId === id*1))
      // eslint-disable-next-line
  },[records])

  const [formData, setFormData] = useState({
    courseName: "",
    grade: 0,
  });
  const handleChange = (e)=>{
    setFormData({...formData, [e.target.name]: e.target.value})
  }

  const handleSubmit = async (e)=>{
    e.preventDefault()
    await addCourse(student.recordId, formData.courseName, formData.grade)
    setFormData({
        courseName:"",
        grade:0
    })
  }
  if(loading) return <Loader loading={loading} color="black" size="2rem"/>
  if(!student)return <NotFoundPage />
  return (
    <div className="w-full h-full flex items-center justify-between gap-8 px-8">
        <div>
            <h2 className="">Add New Course</h2>
            {wallet?
            <form className="border border-gray-600 rounded-3xl p-8 py-10 flex flex-col gap-6">
                <div className="flex flex-col md:flex-row justify-between">
                    <p className="text-2xl ">{student?.studentName}</p>
                    <p className="text-[#1D4ED8]">{student?.studentId}</p>
                </div>

                <div className="flex gap-8">
                    <label htmlFor="courseName" className="min-w-[9vw] text-lg">Course Name:</label>
                    <input 
                        className="text-black px-2 py-1.5 border border-gray-500 rounded outline-none"
                        type="text" 
                        name="courseName" 
                        value={formData.courseName} 
                        onChange={handleChange} 
                        />
                </div>
                <div className="flex gap-8">
                    <label htmlFor="grade" className="min-w-[9vw] text-lg">Grade: </label>
                    <input 
                        className="text-black px-2 py-1.5 border border-gray-500 rounded outline-none min-w-40" 
                        type="number" 
                        name="grade" 
                        min="0"
                        max="100"
                        value={formData.grade} 
                        onChange={handleChange} 
                    />
                </div>
                <button 
                    type="submit" 
                    onClick={handleSubmit}
                    className="p-2 bg-[#1D4ED8] rounded text-white text-semibold text-lg"
                    disabled={loading}
                    style={{
                        opacity:(loading?0.5:1),
                        cursor:(loading?"not-allowed":"pointer")}}
                >
                    {loading?
                    <Loader loading={loading} color="white" size="1rem"/>
                    :
                    "Submit"}
                </button>
            </form>
            :
            <div className="border border-gray-600 rounded-3xl p-8">
                <h2 className="my-2">Login to add</h2>
                <img src="/please-login.svg" alt="Please Login" className="w-[75vw] sm:w-[45vw] md:w-[35vw]"/>
            </div>
            }
        </div>
        
        <CourseTable />
    </div>
  )
}