"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

interface ExperienceForm {
    company: string;
    position: string;
    location: string;
    startDate: string;
    endDate: string;
    isCurrent: boolean;
    description: string;
    technology: string;
    isActive: boolean;
}

interface Experience extends ExperienceForm {
    id: string;
}

export default function AdminExperiencePage() {
    const [loading, setLoading] = useState(false);

    const [experiences, setExperiences] = useState<Experience[]>([]);

    const [editingId, setEditingId] = useState<string | null>(null);

    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    const [formData, setFormData] = useState<ExperienceForm>({
        company: "",
        position: "",
        location: "",
        startDate: "",
        endDate: "",
        isCurrent: false,
        description: "",
        technology: "",
        isActive: true,
    });

    useEffect(() => {
        fetchExperiences();
    }, []);

    const fetchExperiences = async () => {
        try {
            const res = await axios.get(
                `${API_URL}/api/experience`
            );

            setExperiences(res.data.data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement
        >
    ) => {
        const { name, value, type } = e.target;

        if (type === "checkbox") {
            setFormData((prev) => ({
                ...prev,
                [name]: (e.target as HTMLInputElement).checked,
            }));
            return;
        }

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const resetForm = () => {
        setEditingId(null);

        setFormData({
            company: "",
            position: "",
            location: "",
            startDate: "",
            endDate: "",
            isCurrent: false,
            description: "",
            technology: "",
            isActive: true,
        });
    };

    const handleSubmit = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();

        try {
            setLoading(true);

            if (editingId) {
                await axios.put(
                    `${API_URL}/api/experience/${editingId}`,
                    formData,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem(
                                "token"
                            )}`,
                        },
                    }
                );

                toast.success("Experience updated successfully.");
            } else {
                await axios.post(
                    `${API_URL}/api/experience`,
                    formData,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem(
                                "token"
                            )}`,
                        },
                    }
                );

                toast.success("Experience created successfully.");
            }

            resetForm();
            fetchExperiences();
        } catch (error: any) {
            console.log(error);

            toast.error(
                error.response?.data?.message ||
                "Something went wrong."
            );
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (item: Experience) => {
        setEditingId(item.id);

        setFormData({
            company: item.company,
            position: item.position,
            location: item.location,
            startDate: item.startDate,
            endDate: item.endDate || "",
            isCurrent: item.isCurrent,
            description: item.description,
            technology: item.technology,
            isActive: item.isActive,
        });

        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Delete this experience?")) return;

        try {
            await axios.delete(
                `${API_URL}/api/experience/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "token"
                        )}`,
                    },
                }
            );

            toast.success("Experience delete successfully.");
            fetchExperiences();
        } catch (error) {
            console.log(error);
        }
    };
    return (
   <main className="min-h-screen bg-gray-100 p-2 sm:p-4">
    <div className="mx-auto max-w-4xl rounded-xl bg-white p-3 sm:p-5 shadow">

        <h1 className="mb-3 sm:mb-5 text-lg sm:text-xl font-bold text-gray-900">
            Experience Management
        </h1>

        <form
            onSubmit={handleSubmit}
            className="space-y-3"
        >
            <div className="grid grid-cols-1 gap-2 sm:gap-3 md:grid-cols-2">

                <input
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="Company Name"
                    className="rounded-lg border p-2 text-sm text-black"
                />

                <input
                    name="position"
                    value={formData.position}
                    onChange={handleChange}
                    placeholder="Position"
                    className="rounded-lg border p-2 text-sm text-black"
                />

                <input
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="Location"
                    className="rounded-lg border p-2 text-sm text-black"
                />

                <input
                    type="text"
                    name="technology"
                    value={formData.technology}
                    onChange={handleChange}
                    placeholder="React, Next.js, Node.js"
                    className="rounded-lg border p-2 text-sm text-black"
                />

                <div>
                    <label className="mb-1 block text-xs sm:text-sm font-semibold text-gray-700">
                        Start Date
                    </label>

                    <input
                        type="date"
                        name="startDate"
                        value={formData.startDate}
                        onChange={handleChange}
                        className="w-full rounded-lg border p-2 text-sm text-black"
                    />
                </div>

                <div>
                    <label className="mb-1 block text-xs sm:text-sm font-semibold text-gray-700">
                        End Date
                    </label>

                    <input
                        type="date"
                        name="endDate"
                        value={formData.endDate}
                        onChange={handleChange}
                        disabled={formData.isCurrent}
                        className="w-full rounded-lg border p-2 text-sm text-black disabled:bg-gray-200"
                    />
                </div>

            </div>

            <textarea
                rows={3}
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Experience Description..."
                className="w-full rounded-lg border p-2 text-sm text-black"
            />

            <div className="flex flex-wrap gap-3 sm:gap-6">

                <label className="flex items-center gap-1.5">
                    <input
                        type="checkbox"
                        name="isCurrent"
                        checked={formData.isCurrent}
                        onChange={handleChange}
                        className="accent-slate-900"
                    />

                    <span className="text-xs sm:text-sm text-gray-700">
                        Current Company
                    </span>
                </label>

                <label className="flex items-center gap-1.5">
                    <input
                        type="checkbox"
                        name="isActive"
                        checked={formData.isActive}
                        onChange={handleChange}
                        className="accent-slate-900"
                    />

                    <span className="text-xs sm:text-sm text-gray-700">
                        Active
                    </span>
                </label>

            </div>

            <div className="flex flex-wrap gap-2 sm:gap-3">

                <button
                    type="submit"
                    disabled={loading}
                    className="rounded-lg bg-slate-900 px-4 sm:px-6 py-2 text-sm font-semibold text-white hover:bg-slate-800 disabled:opacity-50"
                >
                    {loading
                        ? "Saving..."
                        : editingId
                            ? "Update Experience"
                            : "Add Experience"}
                </button>

                {editingId && (
                    <button
                        type="button"
                        onClick={resetForm}
                        className="rounded-lg bg-gray-500 px-4 sm:px-6 py-2 text-sm font-semibold text-white hover:bg-gray-600"
                    >
                        Cancel
                    </button>
                )}

            </div>

        </form>

        <hr className="my-2 sm:my-3" />

        <h2 className="mb-3 sm:mb-4 text-base sm:text-lg font-bold text-gray-900">
            Experience List
        </h2>
        <div className="overflow-x-auto rounded-lg border border-gray-300 bg-white">
            <table className="min-w-full text-xs text-gray-800">
                <thead className="bg-slate-50 text-gray-900">
                    <tr>
                        <th className="px-2.5 py-2 text-left font-semibold whitespace-nowrap">Company</th>
                        <th className="px-2.5 py-2 text-left font-semibold whitespace-nowrap">Position</th>
                        <th className="px-2.5 py-2 text-left font-semibold whitespace-nowrap">Duration</th>
                        <th className="px-2.5 py-2 text-left font-semibold whitespace-nowrap">Status</th>
                        <th className="px-2.5 py-2 text-center font-semibold whitespace-nowrap">Actions</th>
                    </tr>
                </thead>

                <tbody className="bg-white text-gray-800">
                    {experiences.length > 0 ? (
                        experiences.map((item) => (
                            <tr
                                key={item.id}
                                className="border-t border-gray-200 hover:bg-gray-50"
                            >
                                <td className="px-2.5 py-2.5 text-gray-800">
                                    {item.company}
                                </td>

                                <td className="px-2.5 py-2.5 text-gray-800">
                                    {item.position}
                                </td>

                                <td className="px-2.5 py-2.5 text-gray-800 whitespace-nowrap">
                                    {item.startDate} - {item.isCurrent ? "Present" : item.endDate}
                                </td>

                                <td className="px-2.5 py-2.5">
                                    {item.isActive ? (
                                        <span className="rounded bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700">
                                            Active
                                        </span>
                                    ) : (
                                        <span className="rounded bg-red-100 px-2 py-0.5 text-xs font-medium text-red-700">
                                            Inactive
                                        </span>
                                    )}
                                </td>

                                <td className="px-2.5 py-2.5">
                                    <div className="flex justify-center gap-1.5">
                                        <button
                                            onClick={() => handleEdit(item)}
                                            className="rounded bg-yellow-500 px-2.5 py-1 text-xs text-white hover:bg-yellow-600"
                                        >
                                            Edit
                                        </button>

                                        <button
                                            onClick={() => handleDelete(item.id)}
                                            className="rounded bg-red-600 px-2.5 py-1 text-xs text-white hover:bg-red-700"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td
                                colSpan={5}
                                className="py-5 text-center text-gray-500 text-sm"
                            >
                                No Experience Found
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>

    </div>

</main>
    );
}