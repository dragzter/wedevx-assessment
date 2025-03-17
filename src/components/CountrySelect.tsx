"use client";

const countries = [
    "United States", "Canada", "United Kingdom", "Germany", "France",
    "Australia", "India", "China", "Japan", "Brazil", "South Africa",
    "Mexico", "Argentina", "Russia", "South Korea", "Italy", "Spain",
    "Netherlands", "Sweden", "Switzerland"
];

interface CountrySelectProps {
    onChange: (value: string) => void;
}

export default function CountrySelect({ onChange }: CountrySelectProps) {
    return (
        <div className="mb-3">
            <select name="country" className="form-select" required onChange={(e) => onChange(e.target.value)}>
                <option value="">Select your country</option>
                {countries.map((country) => (
                    <option key={country} value={country}>{country}</option>
                ))}
            </select>
        </div>
    );
}
