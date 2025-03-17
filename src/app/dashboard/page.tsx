"use client";

import {useState, useEffect} from "react";
import LeadTable from "@/components/LeadTable";
import Image from "next/image";
import {useRouter} from "next/navigation";

interface Lead {
    firstName: string;
    lastName: string;
    email: string;
    country: string;
    dateSubmitted: string;
    status: "Pending" | "Reached Out";
}

export default function Dashboard() {
    const [leads, setLeads] = useState<Lead[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const router = useRouter();


    useEffect(() => {
        const fetchLeads = async () => {
            try {
                const response = await fetch("/api/submit");
                if (!response.ok) throw new Error("Failed to fetch leads");

                const data = await response.json();

                // Ensure leads have `status` and `dateSubmitted` fields
                const formattedLeads = data.leads.map((lead: any) => ({
                    ...lead,
                    status: lead.status || "Pending",
                    dateSubmitted: lead.dateSubmitted || new Date().toISOString(),
                }));

                setLeads(formattedLeads);
            } catch (err) {
                setError("Failed to load leads");
            }
        };

        const loggedIn = JSON.parse(sessionStorage.getItem("loggedIn") as string);


        if (!loggedIn) {
            router.push("/");
            setIsAuthenticated(false);
        } else {
            setIsAuthenticated(true);
            fetchLeads();
        }

    }, []);


    return (
        <div className="vh-100 lead-form-wrapper">
            <div className="h-100 d-flex flex-row">
                <div className="nav-menu menu-col  p-3 ">
                    <Image
                        src={"/logo.png"}
                        className={"mb-4"}
                        alt={"Logo"}
                        width={0}
                        height={0}
                        sizes="100vw"
                        style={{width: "120px", height: "auto"}}
                    />
                    <a href="/" className="text-dark d-block">Home</a>
                </div>

                <div className="form-col d-flex w-100 p-3 flex-column">
                    <h1>Leads</h1>

                    {error && <p className="text-danger">{error}</p>}

                    {leads.length === 0 ? (
                        <p className="text-center">No leads submitted yet.</p>
                    ) : (
                        <LeadTable leads={leads}/>
                    )}
                </div>
            </div>
        </div>
    );
}
