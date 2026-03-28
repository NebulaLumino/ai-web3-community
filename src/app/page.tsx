"use client";

import { useState } from "react";
import { generateText } from "ai";
import { createDeepSeek } from "@ai-sdk/deepseek";

const API_KEY = "sk-48987c1a1dc246ecb1b52a01647e8b16";
const API_URL = "https://api.deepseek.com/v1";
const model = createDeepSeek({ apiKey: API_KEY, baseURL: API_URL })("deepseek-chat");

export default function Web3CommunityPage() {
  const [formData, setFormData] = useState({
    projectName: "",
    projectType: "",
    targetAudience: "",
    currentStage: "",
    budget: "",
    platforms: "",
    goals: "",
  });
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setOutput("");

    try {
      const { text } = await generateText({
        model,
        prompt: `You are an expert Web3 community builder and growth strategist. Generate a comprehensive community building strategy for:

- Project Name: ${formData.projectName || "Not specified"}
- Project Type: ${formData.projectType || "DeFi Protocol"}
- Target Audience: ${formData.targetAudience || "DeFi users, crypto traders"}
- Current Stage: ${formData.currentStage || "Pre-launch"}
- Community Budget: ${formData.budget || "Not specified"}
- Preferred Platforms: ${formData.platforms || "Discord, Twitter"}
- Primary Goals: ${formData.goals || "Grow engaged community, drive adoption"}

Generate a detailed community building strategy in Markdown with:

1. **Community Vision & Mission** - What kind of community you're building
2. **Target Persona Profiles** - Detailed personas for ideal community members
3. **Platform Strategy** - Which platforms to prioritize and how to use each
4. **Content Strategy** - Content types, cadence, and themes for each platform
5. **Engagement Tactics** - AMAs, giveaways, competitions, gamification
6. **Community Roles & Structure** - Moderators, ambassadors, role hierarchy
7. **Growth Funnel** - How to convert lurkers → members → advocates
8. **KPI Framework** - Metrics to track for each stage
9. **Timeline & Milestones** - Week-by-week or month-by-month plan
10. **Budget Allocation** - How to distribute budget across initiatives
11. **Community Programs** - Ambassador program, grants, contributor pathways
12. **Crisis Management** - How to handle FUD, trolls, and negative sentiment

Include specific examples and actionable advice for Web3-native communities.`,
      });
      setOutput(text);
    } catch (err: any) {
      setError(err?.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => navigator.clipboard.writeText(output);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-violet-950 to-purple-950 text-white">
      <div className="container mx-auto px-4 py-10 max-w-5xl">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent mb-2">
            🌐 Web3 Community Strategy Generator
          </h1>
          <p className="text-slate-400">Build a thriving community around your Web3 project</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <form onSubmit={handleSubmit} className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
            <h2 className="text-lg font-semibold text-violet-300">Project Details</h2>

            <div>
              <label className="block text-sm text-slate-300 mb-1">Project Name</label>
              <input
                name="projectName"
                value={formData.projectName}
                onChange={handleChange}
                placeholder="e.g. Uniswap"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-violet-500"
              />
            </div>

            <div>
              <label className="block text-sm text-slate-300 mb-1">Project Type</label>
              <select
                name="projectType"
                value={formData.projectType}
                onChange={handleChange}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-violet-500"
              >
                <option value="">Select type</option>
                <option value="DeFi Protocol">DeFi Protocol</option>
                <option value="NFT Collection">NFT Collection</option>
                <option value="Layer 1 Blockchain">Layer 1 Blockchain</option>
                <option value="GameFi / Metaverse">GameFi / Metaverse</option>
                <option value="DAO">DAO</option>
                <option value="Infrastructure">Infrastructure</option>
                <option value="Social / Content">Social / Content</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm text-slate-300 mb-1">Target Audience</label>
              <input
                name="targetAudience"
                value={formData.targetAudience}
                onChange={handleChange}
                placeholder="e.g. DeFi power users, crypto natives, NFT collectors"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-violet-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm text-slate-300 mb-1">Current Stage</label>
                <select
                  name="currentStage"
                  value={formData.currentStage}
                  onChange={handleChange}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-violet-500"
                >
                  <option value="">Select</option>
                  <option value="Pre-launch">Pre-launch</option>
                  <option value="Just launched">Just launched</option>
                  <option value="Growing">Growing</option>
                  <option value="Established">Established</option>
                  <option value="Scaling">Scaling</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-slate-300 mb-1">Budget</label>
                <select
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-violet-500"
                >
                  <option value="">Select</option>
                  <option value="$0 (organic only)">$0 (organic only)</option>
                  <option value="$1,000-$5,000/mo">$1,000-$5,000/mo</option>
                  <option value="$5,000-$20,000/mo">$5,000-$20,000/mo</option>
                  <option value="$20,000+/mo">$20,000+/mo</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm text-slate-300 mb-1">Preferred Platforms</label>
              <input
                name="platforms"
                value={formData.platforms}
                onChange={handleChange}
                placeholder="e.g. Discord, Twitter, Telegram, forums"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-violet-500"
              />
            </div>

            <div>
              <label className="block text-sm text-slate-300 mb-1">Primary Goals</label>
              <textarea
                name="goals"
                value={formData.goals}
                onChange={handleChange}
                rows={2}
                placeholder="e.g. Drive protocol TVL, onboard 10K users, build governance participation"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-violet-500 resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 disabled:opacity-50 text-white font-semibold py-3 rounded-xl transition-all"
            >
              {loading ? "Building Strategy... 🌐" : "Generate Community Strategy 🚀"}
            </button>

            {error && (
              <p className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">{error}</p>
            )}
          </form>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-violet-300">Generated Strategy</h2>
              {output && (
                <button onClick={handleCopy} className="text-sm text-violet-400 hover:text-violet-300 transition-colors">
                  📋 Copy
                </button>
              )}
            </div>

            {output ? (
              <div className="flex-1 overflow-auto">
                <div className="prose prose-invert prose-sm max-w-none text-slate-200 whitespace-pre-wrap">
                  {output}
                </div>
              </div>
            ) : (
              <div className="flex-1 flex items-center justify-center text-slate-500">
                <p className="text-center">Your community strategy will appear here...</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
