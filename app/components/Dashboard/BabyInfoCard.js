"use client";

import { Baby, Cake, Weight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

export default function BabyInfoCard({ baby }) {
  const birthDateValue = baby.dateOfBirth || baby.DOB || baby.dob;
  const name = baby.name || baby.babyName || "Baby";
  const gender = baby.gender || "Not specified";
  const weight = baby.weight || baby.Weight || "N/A";

  const getBirthDate = () => {
    if (!birthDateValue) return null;
    const birthDate = new Date(birthDateValue);
    return Number.isNaN(birthDate.getTime()) ? null : birthDate;
  };

  const birthDate = getBirthDate();

  const age = (() => {
    if (!birthDate) return "N/A";

    const ageInDays = Math.floor((Date.now() - birthDate.getTime()) / 86400000);

    if (ageInDays < 30) return `${ageInDays} days old`;
    if (ageInDays < 365) {
      const months = Math.floor(ageInDays / 30);
      return `${months} ${months === 1 ? "month" : "months"} old`;
    }

    const years = Math.floor(ageInDays / 365);
    const remainingMonths = Math.floor((ageInDays % 365) / 30);
    return `${years} ${years === 1 ? "year" : "years"}${
      remainingMonths > 0
        ? ` and ${remainingMonths} ${
            remainingMonths === 1 ? "month" : "months"
          }`
        : ""
    }`;
  })();

  const dob = birthDate
    ? birthDate.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "N/A";

  const firstYearProgress = birthDate
    ? Math.min(
        100,
        Math.floor(((Date.now() - birthDate.getTime()) / 31536000000) * 100)
      )
    : 0;

  return (
    <Card className="border-2 border-purple-100 bg-white transition-all duration-300 hover:shadow-xl dark:border-purple-900 dark:bg-gray-800">
      <CardHeader className="bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30">
        <div className="flex items-center justify-between gap-3">
          <CardTitle className="flex items-center gap-2 text-2xl text-purple-800 dark:text-purple-200">
            <Baby className="h-7 w-7" />
            {name}
          </CardTitle>
          <div className="rounded-full bg-purple-500 px-3 py-1 text-sm font-medium text-white dark:bg-purple-600">
            {age}
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-6">
        <div className="space-y-4">
          <div className="flex items-center gap-3 rounded-lg bg-purple-50 p-3 dark:bg-purple-900/20">
            <div className="rounded-lg bg-purple-500 p-2 dark:bg-purple-600">
              <Cake className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                Date of Birth
              </p>
              <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                {dob}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-lg bg-pink-50 p-3 dark:bg-pink-900/20">
            <div className="rounded-lg bg-pink-500 p-2 dark:bg-pink-600">
              <Baby className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                Gender
              </p>
              <p className="text-sm font-semibold capitalize text-gray-800 dark:text-gray-200">
                {gender}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-lg bg-blue-50 p-3 dark:bg-blue-900/20">
            <div className="rounded-lg bg-blue-500 p-2 dark:bg-blue-600">
              <Weight className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                Birth Weight
              </p>
              <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                {weight}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 border-t border-gray-200 pt-4 dark:border-gray-700">
          <div className="mb-2 flex items-center justify-between text-xs text-gray-600 dark:text-gray-400">
            <span>First Year Progress</span>
            <span>{firstYearProgress}%</span>
          </div>
          <div className="h-2 w-full rounded-full bg-gray-200 dark:bg-gray-700">
            <div
              className="h-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-500"
              style={{ width: `${firstYearProgress}%` }}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
