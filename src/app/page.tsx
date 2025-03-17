"use client"

import LeadForm from "@/components/LeadForm";
import Image from "next/image";
import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";

export default function HomePage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [showModal, setShowModal] = useState(false);
    const router = useRouter();
    const [loggedIn, setLoggedIn] = useState(false);


    useEffect(() => {
        const loggedIn = sessionStorage.getItem("loggedIn") === "true";
        setLoggedIn(loggedIn);
    }, []);

    const logout = () => {
        sessionStorage.removeItem("loggedIn"); // ✅ Ensure it fully logs out
        setLoggedIn(false);
    };


    const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (username === "admin" && password === "password") {
            sessionStorage.setItem("loggedIn", "true");
            setLoggedIn(true);
            setShowModal(false);
        } else {
            setError("Invalid username or password");
        }
    };

    const goToDashboard = () => {
        router.push("/dashboard"); // ✅ Navigate to dashboard
    };

    return (
        <>
            <div className={"page-content"}>
                {showModal && (
                    <div className="modal d-block" tabIndex={-1}>
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Login</h5>
                                    <button type="button" className="btn-close"
                                            onClick={() => setShowModal(false)}></button>
                                </div>
                                <div className="modal-body">
                                    {error && <div className="alert alert-danger">{error}</div>}

                                    <input
                                        type="text"
                                        placeholder="Username"
                                        className="form-control mb-2"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                    />

                                    <input
                                        type="password"
                                        placeholder="Password"
                                        className="form-control"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary"
                                            onClick={() => setShowModal(false)}>
                                        Close
                                    </button>
                                    <button type="button" className="btn btn-primary"
                                            onClick={handleLogin}>
                                        Login
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {showModal && <div className="modal-backdrop show"></div>}

                <header className={"app-header"}>
                    <Image src={"/bg3.svg"}
                           className={"header-image"}
                           alt="Full Width Banner"
                           width={0}
                           height={0}
                           sizes="100vw"
                           style={{
                               width: "100%",
                               height: "580px",
                               objectFit: "cover",
                               objectPosition: "bottom"
                           }}
                    />


                    <div className={"header-content"}>
                        <div className={"header-content-inner"}>
                            <Image
                                src={"/logo.png"}
                                className={"mb-5"}
                                alt={"Logo"}
                                width={0}
                                height={0}
                                sizes="100vw"
                                style={{width: "120px", height: "auto"}}
                            />
                            <h1 className={"fw-bold text-white"}>Get A Professional Skills Assessment</h1>
                        </div>
                    </div>

                    <div className={"login"}>
                        {!loggedIn && (
                            <button type="button" onClick={() => setShowModal(true)}
                                    className="btn btn-primary">
                                Login
                            </button>
                        )}

                        {loggedIn && (
                            <button type="button" onClick={goToDashboard}
                                    className="btn btn-dark ms-2">
                                <i className="fa-solid fa-table me-2"></i> Leads
                            </button>
                        )}

                        {loggedIn && (
                            <button type="button" onClick={logout}
                                    className="btn btn-dark ms-2">
                                Logout
                            </button>
                        )}
                    </div>
                </header>
                <div className={"lead-page-content"}>
                    <div className={"form-inner-wrapper"}>
                        <div className={"intro"}>
                            <Image
                                src={"/teamwork.png"}
                                alt={"File Icon"}
                                width={0}
                                height={0}
                                style={{width: "80px", height: "auto"}}
                            />

                            <h2 className={"fw-bold mt-3"}>Your assessments are confidential</h2>
                            <p>Submit the form below and our team of experienced coaches will review your data and reach out to you within 24 hours.</p>
                        </div>

                        <LeadForm/>
                    </div>
                </div>
            </div>
        </>
    );
}
