"use client";

import { motion } from "framer-motion";
import { Star, GitFork, Users, BookOpen } from "lucide-react";

/**
 * GitHub-style stats card. Replace the username and the image will pull
 * from public readme stats services.
 */
export function GitHubStats() {
  const username = process.env.NEXT_PUBLIC_GITHUB_USERNAME || "your-github-username";

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="rounded-2xl border border-border bg-card p-6 hover:border-primary/40 transition-colors"
      >
        <div className="flex items-center gap-2 mb-4">
          <BookOpen className="h-5 w-5 text-primary" />
          <h3 className="font-semibold">GitHub Stats</h3>
        </div>
        <img
          src={`https://github-readme-stats.vercel.app/api?username=${username}&show_icons=true&theme=tokyonight&hide_border=true&bg_color=00000000`}
          alt={`${username} GitHub stats`}
          className="w-full h-auto rounded-md"
          loading="lazy"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="rounded-2xl border border-border bg-card p-6 hover:border-primary/40 transition-colors"
      >
        <div className="flex items-center gap-2 mb-4">
          <Star className="h-5 w-5 text-yellow-500" />
          <h3 className="font-semibold">Top Languages</h3>
        </div>
        <img
          src={`https://github-readme-stats.vercel.app/api/top-langs/?username=${username}&layout=compact&theme=tokyonight&hide_border=true&bg_color=00000000`}
          alt={`${username} top languages`}
          className="w-full h-auto rounded-md"
          loading="lazy"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="md:col-span-2 rounded-2xl border border-border bg-card p-6 hover:border-primary/40 transition-colors"
      >
        <div className="flex items-center gap-2 mb-4">
          <GitFork className="h-5 w-5 text-primary" />
          <h3 className="font-semibold">Contribution Streak</h3>
        </div>
        <img
          src={`https://streak-stats.demolab.com?user=${username}&theme=tokyonight&hide_border=true&background=00000000`}
          alt={`${username} streak stats`}
          className="w-full h-auto rounded-md"
          loading="lazy"
        />
      </motion.div>
    </div>
  );
}
