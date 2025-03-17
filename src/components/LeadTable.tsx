"use client";

import {useState} from "react";

interface Lead {
    firstName: string;
    lastName: string;
    email: string;
    country: string;
    dateSubmitted: string;
    status: "Pending" | "Reached Out";
}

interface LeadTableProps {
    leads: Lead[];
}

const LeadTable = ({leads}: LeadTableProps) => {
    const [leadData, setLeadData] = useState<Lead[]>(leads);

    const toggleStatus = (index: number) => {
        setLeadData((prevLeads) =>
            prevLeads.map((lead, i) =>
                i === index ? {
                    ...lead,
                    status: lead.status === "Pending" ? "Reached Out" : "Pending"
                } : lead
            )
        );
    };

    if (leads.length === 0) return null;

    return (
        <div className="table-responsive table-outer rounded-3 flex-grow-1">
            <table className="table table-hover  overflow-hidden">
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Status</th>
                    <th>Date Submitted</th>
                </tr>
                </thead>
                <tbody>
                {leadData.map((lead, index) => (
                    <tr key={index}>
                        <td>{lead.firstName} {lead.lastName}</td>
                        <td>{lead.email}</td>
                        <td>
                            <button
                                className={`btn btn-sm `}
                                onClick={() => toggleStatus(index)}
                            >
                                <i className="fa-solid fa-pen"></i>
                            </button>
                            {lead.status}
                        </td>
                        <td>{new Date(lead.dateSubmitted).toLocaleDateString()}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default LeadTable;
