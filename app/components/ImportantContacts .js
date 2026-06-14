"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import Input from "./ui/Input";
import Button from "./ui/Button";
import Badge from "./ui/Badge";
import {
  Plus,
  Phone,
  Globe,
  Edit,
  Trash2,
  Save,
  XCircle,
} from "lucide-react";

export default function ImportantContacts() {
  const [contacts, setContacts] = useState([]);
  const [adding, setAdding] = useState(false);
  const [editing, setEditing] = useState(null);

  const [form, setForm] = useState({
    name: "",
    type: "phone",
    value: "",
    description: "",
    category: "",
  });

  useEffect(() => {
    const saved = localStorage.getItem("contacts_v2");
    if (saved) setContacts(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("contacts_v2", JSON.stringify(contacts));
  }, [contacts]);

  const resetForm = () => {
    setForm({
      name: "",
      type: "phone",
      value: "",
      description: "",
      category: "",
    });
  };

  const handleSave = () => {
    if (!form.name || !form.value) return;

    if (editing) {
      setContacts((prev) =>
        prev.map((c) => (c.id === editing.id ? { ...editing, ...form } : c))
      );
      setEditing(null);
    } else {
      setContacts((prev) => [...prev, { id: Date.now(), ...form }]);
      setAdding(false);
    }

    resetForm();
  };

  const handleEdit = (contact) => {
    setEditing(contact);
    setForm(contact);
    setAdding(true);
  };

  const handleDelete = (id) => {
    setContacts((prev) => prev.filter((c) => c.id !== id));
  };

  const cancelAction = () => {
    setAdding(false);
    setEditing(null);
    resetForm();
  };

  return (
    <div className="p-6 space-y-6">

      {/* HEADER */}
      <div className="flex flex-wrap items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-white">
            Essential Contacts
          </h2>
          <p className="text-sm text-gray-400">
            Keep your doctor, hospital, and emergency details handy
          </p>
        </div>

        <Button onClick={() => setAdding(true)}>
          <Plus size={16} />
          Add Entry
        </Button>
      </div>

      {/* FORM */}
      {adding && (
        <Card className="bg-[#020617] border border-[#1e293b]">
          <CardHeader>
            <CardTitle>
              {editing ? "Update Contact" : "New Contact"}
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            <Input
              placeholder="Name (Doctor / Hospital)"
              value={form.name}
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
            />

            <Input
              placeholder="Category (e.g. Pediatrician)"
              value={form.category}
              onChange={(e) =>
                setForm({ ...form, category: e.target.value })
              }
            />
           <select
  className="w-full p-2 rounded-md bg-white border border-gray-300 text-black"
  value={form.type}
  onChange={(e) =>
    setForm({ ...form, type: e.target.value })
  }
>
  <option value="phone">Phone</option>

  <option value="website">
    Website
  </option>

</select>

            <Input
              placeholder={
                form.type === "website"
                  ? "https://example.com"
                  : "+91..."
              }
              value={form.value}
              onChange={(e) =>
                setForm({ ...form, value: e.target.value })
              }
            />

            <textarea
               className="w-full p-2 rounded-md bg-white border border-gray-300 text-black placeholder:text-gray-500"
              placeholder="Notes (optional)"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
            />

            <div className="flex gap-2">
              <Button onClick={handleSave}>
                <Save size={14} />
                {editing ? "Update" : "Save"}
              </Button>

              <Button variant="minimal" onClick={cancelAction}>
                <XCircle size={14} />
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* LIST */}
      <Card className="bg-[#020617] border border-[#1e293b]">
        <CardHeader>
          <CardTitle>Saved Contacts</CardTitle>
        </CardHeader>

        <CardContent>
          {contacts.length === 0 ? (
            <div className="text-center py-10 text-gray-500">
              <Phone className="mx-auto mb-3 opacity-40" />
              <p>No contacts yet</p>

              <Button className="mt-4" onClick={() => setAdding(true)}>
                Add First Contact
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              {contacts.map((c) => (
                <div
                  key={c.id}
                  className="flex justify-between items-center p-4 rounded-xl border border-[#1f2937] hover:border-indigo-500/40 transition"
                >
                  <div className="flex gap-3 items-center">
                    {c.type === "phone" ? (
                      <Phone className="text-indigo-400" size={18} />
                    ) : (
                      <Globe className="text-green-400" size={18} />
                    )}

                    <div>
                      <h4 className="text-white flex gap-2 items-center">
                        {c.name}

                        {c.category && (
                          <Badge>{c.category}</Badge>
                        )}
                      </h4>

                      <p className="text-sm text-gray-400">
                        {c.type === "phone" ? (
                          <a href={`tel:${c.value}`}>{c.value}</a>
                        ) : (
                          <a href={c.value} target="_blank">
                            {c.value}
                          </a>
                        )}
                      </p>

                      {c.description && (
                        <p className="text-xs text-gray-500 italic">
                          {c.description}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="minimal"
                      onClick={() => handleEdit(c)}
                    >
                      <Edit size={14} />
                    </Button>

                    <Button
                      size="sm"
                      variant="minimal"
                      onClick={() => handleDelete(c.id)}
                      className="text-red-400"
                    >
                      <Trash2 size={14} />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}