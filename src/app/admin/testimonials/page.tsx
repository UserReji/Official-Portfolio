"use client";

import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, Save, X, Lock, Eye, EyeOff, Quote } from "lucide-react";

interface Testimonial {
  id: string;
  name: string;
  role: string;
  company?: string;
  content: string;
}

const EMPTY_FORM = { name: "", role: "", company: "", content: "" };

export default function AdminTestimonialsPage() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [authed, setAuthed] = useState(false);
  const [authError, setAuthError] = useState("");

  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState(EMPTY_FORM);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setAuthError("");
    const res = await fetch("/api/testimonials");
    if (res.ok) {
      // Verify password by attempting a no-op delete check
      const checkRes = await fetch("/api/testimonials/__check__", {
        method: "DELETE",
        headers: { "x-admin-password": password },
      });
      // 404 means password was accepted (entry not found), 401 means wrong password
      if (checkRes.status === 404 || checkRes.status !== 401) {
        setAuthed(true);
        setTestimonials(await res.json());
      } else {
        setAuthError("Incorrect password. Try again.");
      }
    } else {
      setAuthError("Could not connect. Try again.");
    }
  }

  async function fetchTestimonials() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/testimonials");
      if (!res.ok) throw new Error();
      setTestimonials(await res.json());
    } catch {
      setError("Could not load testimonials.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (authed) fetchTestimonials();
  }, [authed]);

  function openAdd() {
    setForm(EMPTY_FORM);
    setEditingId(null);
    setShowForm(true);
  }

  function openEdit(t: Testimonial) {
    setForm({ name: t.name, role: t.role, company: t.company || "", content: t.content });
    setEditingId(t.id);
    setShowForm(true);
  }

  function cancelForm() {
    setShowForm(false);
    setEditingId(null);
    setForm(EMPTY_FORM);
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      const isEdit = !!editingId;
      const url = isEdit ? `/api/testimonials/${editingId}` : "/api/testimonials";
      const method = isEdit ? "PUT" : "POST";

      const headers: Record<string, string> = { "Content-Type": "application/json" };
      if (isEdit) headers["x-admin-password"] = password;

      const res = await fetch(url, { method, headers, body: JSON.stringify(form) });
      if (!res.ok) throw new Error();
      await fetchTestimonials();
      cancelForm();
    } catch {
      setError("Failed to save. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this testimonial? This cannot be undone.")) return;
    setDeletingId(id);
    setError("");
    try {
      const res = await fetch(`/api/testimonials/${id}`, {
        method: "DELETE",
        headers: { "x-admin-password": password },
      });
      if (!res.ok) throw new Error();
      await fetchTestimonials();
    } catch {
      setError("Failed to delete. Please try again.");
    } finally {
      setDeletingId(null);
    }
  }

  // ── Login screen ──────────────────────────────────────────────────────────
  if (!authed) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-4">
        <div className="w-full max-w-sm">
          <div className="flex items-center justify-center mb-8">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <Lock className="h-6 w-6 text-primary" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-center mb-1">Admin Access</h1>
          <p className="text-sm text-muted-foreground text-center mb-8">
            Enter your password to manage testimonials.
          </p>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Admin password"
                autoFocus
                className="w-full rounded-lg border border-border bg-card px-4 py-3 pr-12 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            {authError && (
              <p className="text-sm text-red-500 text-center">{authError}</p>
            )}
            <button
              type="submit"
              disabled={!password}
              className="w-full rounded-lg bg-primary text-primary-foreground py-3 text-sm font-semibold hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              Unlock
            </button>
          </form>
        </div>
      </div>
    );
  }

  // ── Admin UI ──────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-12">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Testimonials</h1>
            <p className="text-muted-foreground text-sm mt-1">
              {testimonials.length} entr{testimonials.length === 1 ? "y" : "ies"}
            </p>
          </div>
          <button
            onClick={openAdd}
            className="flex items-center gap-2 rounded-lg bg-primary text-primary-foreground px-4 py-2.5 text-sm font-semibold hover:bg-primary/90 transition"
          >
            <Plus className="h-4 w-4" />
            Add New
          </button>
        </div>

        {/* Error banner */}
        {error && (
          <div className="mb-6 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-500">
            {error}
          </div>
        )}

        {/* Add / Edit form */}
        {showForm && (
          <div className="mb-8 rounded-2xl border border-primary/30 bg-card p-6 shadow-md">
            <h2 className="font-semibold text-lg mb-5">
              {editingId ? "Edit Testimonial" : "New Testimonial"}
            </h2>
            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1.5">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                    placeholder="e.g. Sir Arvin Lauron"
                    className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1.5">
                    Role <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={form.role}
                    onChange={(e) => setForm({ ...form, role: e.target.value })}
                    required
                    placeholder="e.g. Thesis Adviser"
                    className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1.5">
                  Company / Organization
                </label>
                <input
                  type="text"
                  value={form.company}
                  onChange={(e) => setForm({ ...form, company: e.target.value })}
                  placeholder="e.g. Holy Cross of Davao College"
                  className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1.5">
                  Testimonial <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={form.content}
                  onChange={(e) => setForm({ ...form, content: e.target.value })}
                  required
                  rows={4}
                  placeholder="What did they say about you?"
                  className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition resize-none"
                />
              </div>
              <div className="flex items-center gap-3 pt-1">
                <button
                  type="submit"
                  disabled={saving}
                  className="flex items-center gap-2 rounded-lg bg-primary text-primary-foreground px-5 py-2.5 text-sm font-semibold hover:bg-primary/90 disabled:opacity-50 transition"
                >
                  <Save className="h-4 w-4" />
                  {saving ? "Saving…" : "Save"}
                </button>
                <button
                  type="button"
                  onClick={cancelForm}
                  className="flex items-center gap-2 rounded-lg border border-border px-5 py-2.5 text-sm font-medium hover:bg-muted transition"
                >
                  <X className="h-4 w-4" />
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* List */}
        {loading ? (
          <div className="text-center py-20 text-muted-foreground text-sm">Loading…</div>
        ) : testimonials.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground text-sm">
            No testimonials yet.
          </div>
        ) : (
          <div className="space-y-4">
            {testimonials.map((t) => (
              <div
                key={t.id}
                className="relative rounded-2xl border border-border bg-card p-6 hover:border-primary/30 transition"
              >
                <Quote className="absolute top-4 right-16 h-7 w-7 text-primary/15" />
                <p className="text-sm leading-relaxed text-foreground/90 mb-4">
                  &ldquo;{t.content}&rdquo;
                </p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-sm">{t.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {t.role}{t.company ? ` · ${t.company}` : ""}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => openEdit(t)}
                      className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs font-medium hover:bg-muted hover:border-primary/40 transition"
                    >
                      <Pencil className="h-3.5 w-3.5" />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(t.id)}
                      disabled={deletingId === t.id}
                      className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-red-500 hover:bg-red-500/10 hover:border-red-500/40 disabled:opacity-50 transition"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                      {deletingId === t.id ? "Deleting…" : "Delete"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
