"use client";

import {useState} from "react";
import CountrySelect from "@/components/CountrySelect";
import Image from "next/image";

const LeadForm = () => {
    const [submittedLeads, setSubmittedLeads] = useState<any[]>([]);
    const [country, setCountry] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [submitted, setSubmitted] = useState(false);
    const [selectedSKills, setSelectedSkills] = useState<string[]>([]);
    const [resume, setResume] = useState<File | null>(null);

    const handleResumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setResume(event.target.files[0]);
        }
    };

    const handleSkillChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {value, checked} = event.target;
        setSelectedSkills((prev) =>
            checked ? [...prev, value] : prev.filter((skill) => skill !== value)
        );
    };


    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError(null);

        const formData = new FormData(event.currentTarget);

        const requiredFields = ["firstName", "lastName", "resume", "email", "linkedInProfile"];
        for (const field of requiredFields) {
            if (!formData.get(field)) {
                setError(`${field} is required`);
                return;
            }
        }

        if (!resume) {
            setError("Please upload a resume.");
            return;
        }

        formData.append("resume", resume);

        const leadData = {
            firstName: formData.get("firstName"),
            lastName: formData.get("lastName"),
            email: formData.get("email"),
            country,
            linkedInProfile: formData.get("linkedInProfile"),
            skillsOfInterest: selectedSKills,
            additionalInfo: formData.get("additionalInfo"),
            resumeFileName: resume.name, // Store filename
        };

        try {
            const response = await fetch("/api/submit", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(leadData),
            });

            if (!response.ok) {
                throw new Error("Failed to submit lead");
            }

            const result = await response.json();

            setSubmittedLeads((prevLeads) => [...prevLeads, result.data]);
            setSubmitted(true);

            event.currentTarget.reset();
            setCountry("");
            setSelectedSkills([]);
        } catch (error) {
            setError("Submission failed. Please try again.");
        }
    };


    return (
        <div className="container mt-3">
            <div className=" form-wrapper">

                {submitted ? (
                    <div className={"text-center"}>
                        <Image src={"/thumb-up.png"}
                               className={"mb-2"}
                               alt={"Thumb up Icon"}
                               width={0}
                               height={0}
                               style={{width: "60px", height: "auto"}}
                        />
                        <h2 className={"mb-2"}>Thank You</h2>
                        <h5>Your information was submitted to our team of career coaches. Expect an email from welcome@ilancer.ai.</h5>

                        <button className={"btn btn-dark mt-4 w-100"}>Go Back To Homepage</button>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="needs-validation" noValidate>
                        {error && <div className="alert alert-danger">{error}</div>}

                        <div className="mb-3">
                            <input type="text" name="firstName"
                                   placeholder={"First Name"}

                                   className="form-control" required/>
                        </div>

                        <div className="mb-3">
                            <input type="text" name="lastName" placeholder={"Last Name"}
                                   className="form-control" required/>
                        </div>

                        <div className="mb-3">
                            <input
                                type="email" name="email" placeholder={"Email"}
                                className="form-control" required/>
                        </div>

                        <CountrySelect onChange={setCountry}/>

                        <div className="mb-3">
                            <label className="form-label fw-bold">Upload Resume (PDF, DOCX)</label>
                            <input type="file" name="resume" accept=".pdf,.doc,.docx"
                                   className="form-control" onChange={handleResumeChange} required/>
                        </div>

                        <div className="mb-5">
                            <input
                                type="text" placeholder={"LinkedIn / Personal Website URL"}
                                name="linkedInProfile" className="form-control" required/>
                        </div>

                        <div className="mb-5">
                            <div className={"text-center"}>
                                <Image src={"/requirements.png"}
                                       className={"mb-2"}
                                       alt={"Dice Icon"}
                                       width={0}
                                       height={0}
                                       style={{width: "80px", height: "auto"}}
                                />
                                <h2 className={"fw-bold"}>Skills areas of interest?</h2>
                            </div>


                            <div className="mb-5">
                                {["Communication", "Management", "Interview", "Not sure yet"].map((skill) => (
                                    <div key={skill} className="form-check">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            name="skillsOfInterest"
                                            value={skill}
                                            onChange={handleSkillChange}
                                        />
                                        <label className="form-check-label">{skill}</label>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="mb-3">
                            <div className={"text-center"}>
                                <Image src={"/information.png"}
                                       className={"mb-2"}
                                       alt={"Dice Icon"}
                                       width={0}
                                       height={0}
                                       style={{width: "80px", height: "auto"}}
                                />
                                <h2 className={"fw-bold"}>How can we help you?</h2>
                            </div>

                            <textarea name="additionalInfo" className="form-control" rows={5}/>
                        </div>

                        <button type="submit" className="mt-4 btn btn-dark w-100">Submit</button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default LeadForm;

