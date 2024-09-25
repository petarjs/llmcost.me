"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { encode } from "gpt-tokenizer";
import { Brain, Cpu, ExternalLink, Users, Workflow, Zap } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { GeistMono } from "geist/font/mono";

type ModelName = keyof typeof models;

const models = {
  "GPT-4o mini": {
    provider: "OpenAI",
    input: 0.00015,
    output: 0.0006,
    context: "128k",
  },
  "GPT-4o": {
    provider: "OpenAI",
    input: 0.005,
    output: 0.015,
    context: "128k",
  },
  "GPT-4 Turbo": {
    provider: "OpenAI",
    input: 0.01,
    output: 0.03,
    context: "128k",
  },
  "GPT-4 32k": {
    provider: "OpenAI",
    input: 0.06,
    output: 0.12,
    context: "32k",
  },
  "GPT-4 8k": { provider: "OpenAI", input: 0.03, output: 0.06, context: "8k" },
  "GPT-3.5 Turbo": {
    provider: "OpenAI",
    input: 0.0015,
    output: 0.002,
    context: "4k",
  },
  "Claude 3 Opus": {
    provider: "Anthropic",
    input: 0.015,
    output: 0.075,
    context: "200k",
  },
  "Claude 3 Sonnet": {
    provider: "Anthropic",
    input: 0.003,
    output: 0.015,
    context: "200k",
  },
  "Claude 3 Haiku": {
    provider: "Anthropic",
    input: 0.00025,
    output: 0.00125,
    context: "200k",
  },
  "Gemini 1.5 Pro": {
    provider: "Google",
    input: 0.007,
    output: 0.021,
    context: "1m",
  },
  "Gemini 1.0 Pro": {
    provider: "Google",
    input: 0.0005,
    output: 0.0015,
    context: "32k",
  },
  "Gemini 1.5 Flash": {
    provider: "Google",
    input: 0.0007,
    output: 0.0021,
    context: "1m",
  },
  "Llama 3.1 405b": {
    provider: "Google",
    input: 0.003,
    output: 0.005,
    context: "128k",
  },
  "Llama 2 70b": {
    provider: "Google",
    input: 0.001,
    output: 0.001,
    context: "4k",
  },
};

export function LlmCostCalculator() {
  const [model, setModel] = useState<ModelName>("GPT-4o mini");
  const [inputTokens, setInputTokens] = useState(0);
  const [outputTokens, setOutputTokens] = useState(0);
  const [users, setUsers] = useState(1000);
  const [exampleInput, setExampleInput] = useState("");
  const [exampleOutput, setExampleOutput] = useState("");

  const calculateCost = () => {
    const modelPricing = models[model];
    const inputCost = (inputTokens / 1000) * modelPricing.input;
    const outputCost = (outputTokens / 1000) * modelPricing.output;
    const totalCost = (inputCost + outputCost) * users;
    return totalCost.toFixed(2);
  };

  const updateTokenCounts = () => {
    setInputTokens(encode(exampleInput).length);
    setOutputTokens(encode(exampleOutput).length);
  };

  useEffect(() => {
    updateTokenCounts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [exampleInput, exampleOutput]);

  return (
    <div className={`max-w-7xl mx-auto px-4 py-8 ${GeistMono.className}`}>
      <h1 className="text-4xl font-bold text-center mb-2 text-gradient">
        LLM Cost Calculator
      </h1>
      <p className="text-xl text-center mb-2 text-indigo-600 dark:text-indigo-400">
        Estimate Your AI Project Expenses
      </p>
      <p className="text-center mb-4 text-gray-600 dark:text-gray-400">
        Plan your budget with precision for large language model integration
      </p>

      <div className="mb-8 text-center">
        <Link href="https://automateo.app" target="_blank">
          <Button className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 px-4 rounded-full">
            Powered by Automateo
            <ExternalLink className="w-4 h-4 ml-2" />
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="w-full bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-indigo-900 dark:via-purple-900 dark:to-pink-900 overflow-hidden">
          <CardHeader className="border-b border-gray-200 dark:border-gray-700">
            <CardTitle className="text-2xl text-center">
              Calculate Your AI Tool Costs
            </CardTitle>
            <CardDescription className="text-center">
              Make informed decisions for your LLM-powered applications
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-6">
              <div className="space-y-2">
                <Label className="text-sm font-medium flex items-center gap-2">
                  <Brain className="w-4 h-4 text-indigo-500" />
                  Select Model
                </Label>
                <Select
                  value={model}
                  onValueChange={(value: ModelName) => setModel(value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a model" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.keys(models).map((modelName) => (
                      <SelectItem key={modelName} value={modelName}>
                        {models[modelName as ModelName].provider} {modelName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium flex items-center gap-2">
                  <Zap className="w-4 h-4 text-yellow-500" />
                  Example Input
                </Label>
                <Textarea
                  placeholder="Enter example input text"
                  value={exampleInput}
                  onChange={(e) => setExampleInput(e.target.value)}
                  className="bg-white dark:bg-gray-800"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium flex items-center gap-2">
                  <Zap className="w-4 h-4 text-orange-500" />
                  Example Output
                </Label>
                <Textarea
                  placeholder="Enter example output text"
                  value={exampleOutput}
                  onChange={(e) => setExampleOutput(e.target.value)}
                  className="bg-white dark:bg-gray-800"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-blue-500" />
                  Input Tokens: {inputTokens}
                </Label>
                <Slider
                  min={0}
                  max={Math.max(4000, inputTokens)}
                  step={1}
                  value={[inputTokens]}
                  onValueChange={([value]) => setInputTokens(value)}
                  className="bg-white dark:bg-gray-800 p-2 rounded-md"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-purple-500" />
                  Output Tokens: {outputTokens}
                </Label>
                <Slider
                  min={0}
                  max={Math.max(4000, outputTokens)}
                  step={1}
                  value={[outputTokens]}
                  onValueChange={([value]) => setOutputTokens(value)}
                  className="bg-white dark:bg-gray-800 p-2 rounded-md"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium flex items-center gap-2">
                  <Users className="w-4 h-4 text-pink-500" />
                  Number of Users
                </Label>
                <Input
                  type="number"
                  min="1"
                  value={users}
                  onChange={(e) => setUsers(parseInt(e.target.value) || 0)}
                  className="bg-white dark:bg-gray-800"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-8">
          <Card className="w-full bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-900 dark:to-emerald-800 overflow-hidden">
            <CardHeader className="border-b border-gray-200 dark:border-gray-700">
              <CardTitle className="text-2xl text-center">
                Estimated Cost
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="flex flex-col justify-center items-center h-full">
                <div className="text-7xl font-bold text-gradient mb-4">
                  ${calculateCost()}
                </div>
                <p className="text-lg text-center text-gray-700 dark:text-gray-300">
                  Based on {users} users
                </p>
                <p className="text-lg text-center text-gray-700 dark:text-gray-300">
                  {inputTokens} input tokens
                </p>
                <p className="text-lg text-center text-gray-700 dark:text-gray-300">
                  {outputTokens} output tokens
                </p>
                <p className="text-lg text-center text-gray-700 dark:text-gray-300 mt-4">
                  Selected Model: {model}
                </p>
                <p className="text-lg text-center text-gray-700 dark:text-gray-300">
                  Provider: {models[model].provider}
                </p>
                <p className="text-lg text-center text-gray-700 dark:text-gray-300">
                  Context: {models[model].context} tokens
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="w-full bg-gradient-to-br from-yellow-50 to-amber-100 dark:from-yellow-900 dark:to-amber-800 overflow-hidden">
            <CardHeader className="border-b border-gray-200 dark:border-gray-700">
              <CardTitle className="text-2xl text-center">
                Optimize Your AI Workflow
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center space-y-4">
                <Workflow className="w-16 h-16 text-yellow-600 dark:text-yellow-400" />
                <h3 className="text-xl font-semibold">
                  Build Smarter AI Workflows with Automateo
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Automateo is an AI workflow builder that helps you create,
                  optimize, and manage your AI-powered applications with ease.
                </p>
                <ul className="text-left text-gray-700 dark:text-gray-300 space-y-2">
                  <li>✓ Drag-and-drop interface for easy workflow creation</li>
                  <li>✓ Integrate multiple AI models seamlessly</li>
                  <li>✓ Optimize costs and performance automatically</li>
                  <li>✓ Scale your AI applications effortlessly</li>
                </ul>
                <Link href="https://automateo.app" target="_blank">
                  <Button className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-2 px-6 rounded-full">
                    Sign Up for Automateo
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Card className="mt-8 w-full">
        <CardHeader>
          <CardTitle>LLM Pricing Table</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Model</TableHead>
                <TableHead>Provider</TableHead>
                <TableHead>Input Price (per 1K tokens)</TableHead>
                <TableHead>Output Price (per 1K tokens)</TableHead>
                <TableHead>Context Window</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Object.entries(models).map(([name, info]) => (
                <TableRow key={name}>
                  <TableCell className="font-medium">{name}</TableCell>
                  <TableCell>{info.provider}</TableCell>
                  <TableCell>${info.input.toFixed(4)}</TableCell>
                  <TableCell>${info.output.toFixed(4)}</TableCell>
                  <TableCell>{info.context.toLocaleString()} tokens</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="mt-12 prose dark:prose-invert max-w-none">
        <h2 className="text-3xl font-bold mb-4">
          Understanding LLM Costs for Your AI Projects
        </h2>
        <p>
          As artificial intelligence and machine learning become increasingly
          integral to modern applications, understanding the costs associated
          with these technologies is crucial for developers and businesses
          alike. Our LLM Cost Calculator is designed to help you estimate the
          expenses related to using large language models (LLMs) in your
          projects.
        </p>
        <h3 className="text-2xl font-semibold mt-6 mb-3">
          Key Factors Affecting LLM Costs
        </h3>
        <ul>
          <li>
            <strong>Model Selection:</strong> Different models have varying
            pricing structures based on their capabilities and computational
            requirements.
          </li>
          <li>
            <strong>Token Usage:</strong> LLMs process text in chunks called
            tokens. The number of input and output tokens directly impacts the
            cost.
          </li>
          <li>
            <strong>User Base:</strong> The scale of your application,
            represented by the number of users, multiplies the per-request cost.
          </li>
          <li>
            <strong>Context Window:</strong> The maximum number of tokens a
            model can process in a single request, affecting the complexity of
            tasks it can handle.
          </li>
        </ul>
        <h3 className="text-2xl font-semibold mt-6 mb-3">
          Optimizing Your LLM Usage
        </h3>
        <p>
          To keep costs manageable while leveraging the power of LLMs, consider
          the following strategies:
        </p>
        <ol>
          <li>
            Choose the right model for your needs, balancing performance and
            cost.
          </li>
          <li>Optimize your prompts to reduce unnecessary tokens.</li>
          <li>Implement caching mechanisms to avoid redundant API calls.</li>
          <li>
            Monitor and analyze your usage patterns to identify areas for
            improvement.
          </li>
          <li>
            {`Consider the context window size when designing your application's
            interaction with the LLM.`}
          </li>
        </ol>
        <p>
          By using our LLM Cost Calculator and following these optimization
          strategies, you can make informed decisions about integrating AI into
          your projects while keeping your budget in check.
        </p>
      </div>
    </div>
  );
}
