'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  published: boolean;
  coverImage?: string;
}

const CATEGORIES = ['Branding', 'Design', 'Development', 'Motion', 'Strategy', 'General'];

const emptyForm = {
  title: '',
  excerpt: '',
  content: '',
  category: 'General',
  author: 'Kreative Catalyst',
  published: true,
  coverImage: '',
};

export default function AdminBlog() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const fetchBlogs = useCallback(async () => {
    const res = await fetch('/api/blog');
    const data = await res.json();
    setBlogs(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/upload', { method: 'POST', body: formData });
      const data = await res.json();
      if (data.url) {
        setForm((prev) => ({ ...prev, coverImage: data.url }));
      }
    } catch (err) {
      console.error('Upload failed:', err);
    }
    setUploading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim() || !form.content.trim()) return;

    setSaving(true);

    if (editing) {
      await fetch(`/api/blog/${editing}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
    } else {
      await fetch('/api/blog', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
    }

    setForm(emptyForm);
    setEditing(null);
    setShowForm(false);
    setSaving(false);
    fetchBlogs();
  };

  const handleEdit = (blog: BlogPost) => {
    setForm({
      title: blog.title,
      excerpt: blog.excerpt,
      content: blog.content,
      category: blog.category,
      author: blog.author,
      published: blog.published,
      coverImage: blog.coverImage || '',
    });
    setEditing(blog.id);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id: string) => {
    await fetch(`/api/blog/${id}`, { method: 'DELETE' });
    setDeleteConfirm(null);
    fetchBlogs();
  };

  const handleCancel = () => {
    setForm(emptyForm);
    setEditing(null);
    setShowForm(false);
  };

  const togglePublish = async (blog: BlogPost) => {
    await fetch(`/api/blog/${blog.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ published: !blog.published }),
    });
    fetchBlogs();
  };

  return (
    <div className="min-h-screen bg-dark text-light">
      {/* Header */}
      <header className="border-b border-dark-700/40 bg-dark-900/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3 sm:gap-4">
            <Link
              href="/"
              className="text-light-300/60 hover:text-light transition-colors text-sm"
            >
              &larr; Site
            </Link>
            <div className="w-px h-5 bg-dark-700/40" />
            <Link
              href="/admin/reviews"
              className="text-light-300/60 hover:text-light transition-colors text-sm"
            >
              Reviews
            </Link>
            <div className="w-px h-5 bg-dark-700/40" />
            <h1 className="font-heading font-bold text-lg sm:text-xl">
              Blog <span className="text-accent-blue">Manager</span>
            </h1>
          </div>
          <button
            onClick={() => {
              if (showForm) {
                handleCancel();
              } else {
                setShowForm(true);
              }
            }}
            className="px-4 py-2 rounded-lg text-sm font-medium bg-gradient-to-r from-accent-blue to-accent-gold text-dark-900 hover:shadow-lg hover:shadow-accent-blue/20 transition-all"
          >
            {showForm ? 'Cancel' : '+ New Post'}
          </button>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Form */}
        {showForm && (
          <form
            onSubmit={handleSubmit}
            className="mb-10 p-6 rounded-2xl border border-dark-700/30 bg-dark-800/50"
          >
            <h2 className="font-heading font-semibold text-lg mb-6">
              {editing ? 'Edit Post' : 'Create New Post'}
            </h2>

            <div className="space-y-5">
              {/* Title */}
              <div>
                <label className="block text-sm text-light-300/60 mb-1.5">
                  Title *
                </label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) =>
                    setForm({ ...form, title: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-lg bg-dark-900 border border-dark-700/40 text-light focus:border-accent-blue/50 focus:outline-none transition-colors text-sm"
                  placeholder="Enter blog title..."
                  required
                />
              </div>

              {/* Cover Image Upload */}
              <div>
                <label className="block text-sm text-light-300/60 mb-1.5">
                  Cover Image
                </label>
                <div className="flex items-center gap-4">
                  <label className="px-4 py-2.5 rounded-lg text-sm font-medium border border-dark-700/40 text-light-300/60 hover:text-light hover:border-dark-700 transition-colors cursor-pointer">
                    {uploading ? 'Uploading...' : 'Choose Image'}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      disabled={uploading}
                    />
                  </label>
                  {form.coverImage && (
                    <div className="flex items-center gap-3">
                      <div className="relative w-20 h-12 rounded-md overflow-hidden border border-dark-700/40">
                        <Image
                          src={form.coverImage}
                          alt="Cover preview"
                          fill
                          className="object-cover"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => setForm({ ...form, coverImage: '' })}
                        className="text-xs text-red-400/70 hover:text-red-400 transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Category & Author row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm text-light-300/60 mb-1.5">
                    Category
                  </label>
                  <select
                    value={form.category}
                    onChange={(e) =>
                      setForm({ ...form, category: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-lg bg-dark-900 border border-dark-700/40 text-light focus:border-accent-blue/50 focus:outline-none transition-colors text-sm"
                  >
                    {CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-light-300/60 mb-1.5">
                    Author
                  </label>
                  <input
                    type="text"
                    value={form.author}
                    onChange={(e) =>
                      setForm({ ...form, author: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-lg bg-dark-900 border border-dark-700/40 text-light focus:border-accent-blue/50 focus:outline-none transition-colors text-sm"
                  />
                </div>
              </div>

              {/* Excerpt */}
              <div>
                <label className="block text-sm text-light-300/60 mb-1.5">
                  Excerpt
                </label>
                <textarea
                  value={form.excerpt}
                  onChange={(e) =>
                    setForm({ ...form, excerpt: e.target.value })
                  }
                  rows={2}
                  className="w-full px-4 py-3 rounded-lg bg-dark-900 border border-dark-700/40 text-light focus:border-accent-blue/50 focus:outline-none transition-colors text-sm resize-none"
                  placeholder="Short description shown on blog cards..."
                />
              </div>

              {/* Content */}
              <div>
                <label className="block text-sm text-light-300/60 mb-1.5">
                  Content *
                </label>
                <textarea
                  value={form.content}
                  onChange={(e) =>
                    setForm({ ...form, content: e.target.value })
                  }
                  rows={12}
                  className="w-full px-4 py-3 rounded-lg bg-dark-900 border border-dark-700/40 text-light focus:border-accent-blue/50 focus:outline-none transition-colors text-sm resize-y font-mono leading-relaxed"
                  placeholder="Write your blog content here... Use double newlines for paragraphs."
                  required
                />
              </div>

              {/* Published toggle */}
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() =>
                    setForm({ ...form, published: !form.published })
                  }
                  className={`relative w-11 h-6 rounded-full transition-colors ${
                    form.published ? 'bg-accent-blue' : 'bg-dark-700'
                  }`}
                >
                  <div
                    className={`absolute top-0.5 w-5 h-5 rounded-full bg-white transition-transform ${
                      form.published ? 'left-[22px]' : 'left-0.5'
                    }`}
                  />
                </button>
                <span className="text-sm text-light-300/60">
                  {form.published ? 'Published' : 'Draft'}
                </span>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-2.5 rounded-lg text-sm font-medium bg-accent-blue text-dark-900 hover:bg-accent-blue/90 transition-colors disabled:opacity-50"
                >
                  {saving
                    ? 'Saving...'
                    : editing
                    ? 'Update Post'
                    : 'Publish Post'}
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-6 py-2.5 rounded-lg text-sm font-medium border border-dark-700/40 text-light-300/60 hover:text-light hover:border-dark-700 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        )}

        {/* Blog list */}
        {loading ? (
          <div className="text-center py-20 text-light-300/40">Loading...</div>
        ) : blogs.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-light-300/40 mb-4">No blog posts yet.</p>
            <button
              onClick={() => setShowForm(true)}
              className="text-accent-blue text-sm hover:underline"
            >
              Create your first post
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="text-sm text-light-300/40 mb-4">
              {blogs.length} post{blogs.length !== 1 ? 's' : ''}
            </div>
            {blogs.map((blog) => (
              <div
                key={blog.id}
                className="p-5 rounded-xl border border-dark-700/30 bg-dark-800/30 hover:border-dark-700/50 transition-all group"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4 flex-1 min-w-0">
                    {blog.coverImage && (
                      <div className="relative w-16 h-10 rounded-md overflow-hidden border border-dark-700/40 shrink-0">
                        <Image
                          src={blog.coverImage}
                          alt=""
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2">
                        <span
                          className={`text-xs px-2 py-0.5 rounded-full ${
                            blog.published
                              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                              : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                          }`}
                        >
                          {blog.published ? 'Published' : 'Draft'}
                        </span>
                        <span className="text-xs text-light-300/30">
                          {blog.category}
                        </span>
                        <span className="text-xs text-light-300/30">
                          {blog.date}
                        </span>
                      </div>
                      <h3 className="font-heading font-semibold text-base mb-1 truncate">
                        {blog.title}
                      </h3>
                      <p className="text-sm text-light-300/40 truncate">
                        {blog.excerpt}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => togglePublish(blog)}
                      className="px-3 py-1.5 rounded-lg text-xs border border-dark-700/40 text-light-300/50 hover:text-light hover:border-dark-700 transition-colors"
                    >
                      {blog.published ? 'Unpublish' : 'Publish'}
                    </button>
                    <button
                      onClick={() => handleEdit(blog)}
                      className="px-3 py-1.5 rounded-lg text-xs border border-dark-700/40 text-accent-blue/70 hover:text-accent-blue hover:border-accent-blue/30 transition-colors"
                    >
                      Edit
                    </button>
                    {deleteConfirm === blog.id ? (
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleDelete(blog.id)}
                          className="px-3 py-1.5 rounded-lg text-xs bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20 transition-colors"
                        >
                          Confirm
                        </button>
                        <button
                          onClick={() => setDeleteConfirm(null)}
                          className="px-3 py-1.5 rounded-lg text-xs border border-dark-700/40 text-light-300/50 hover:text-light transition-colors"
                        >
                          No
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setDeleteConfirm(blog.id)}
                        className="px-3 py-1.5 rounded-lg text-xs border border-dark-700/40 text-red-400/50 hover:text-red-400 hover:border-red-500/30 transition-colors"
                      >
                        Delete
                      </button>
                    )}
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
