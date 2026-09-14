"use client";

import React, { createContext, useContext, useState } from "react";
import { CareerProfileData, DocumentRecord, UserPlan, JobApplication } from "@/types";
import { INITIAL_PROFILE, calculateCompletion, isUserAdmin } from "@/lib/profileState";

interface AppContextType {
  profileData: CareerProfileData;
  updateProfileData: (data: Partial<CareerProfileData>) => void;
  documents: DocumentRecord[];
  addDocument: (doc: Omit<DocumentRecord, "id" | "created_at" | "updated_at">) => DocumentRecord;
  deleteDocument: (id: string) => void;
  applications: JobApplication[];
  addApplication: (app: Omit<JobApplication, "id">) => void;
  updateApplicationStatus: (id: string, status: JobApplication["status"]) => void;
  userEmail: string;
  setUserEmail: (email: string) => void;
  plan: UserPlan;
  upgradePlan: (newPlan: UserPlan) => void;
  isAdmin: boolean;
  completionScore: number;
  theme: "light" | "dark";
  toggleTheme: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY_THEME = "sck_theme_v1";

const LOCAL_STORAGE_KEY_PROFILE = "sck_profile_v1";
const LOCAL_STORAGE_KEY_DOCS = "sck_documents_v1";
const LOCAL_STORAGE_KEY_PLAN = "sck_plan_v1";
const LOCAL_STORAGE_KEY_EMAIL = "sck_email_v1";
const LOCAL_STORAGE_KEY_APPS = "sck_applications_v1";

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [profileData, setProfileData] = useState<CareerProfileData>(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem(LOCAL_STORAGE_KEY_PROFILE);
        if (saved) return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return INITIAL_PROFILE;
  });

  const [documents, setDocuments] = useState<DocumentRecord[]>(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem(LOCAL_STORAGE_KEY_DOCS);
        if (saved) return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return [];
  });

  const [applications, setApplications] = useState<JobApplication[]>(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem(LOCAL_STORAGE_KEY_APPS);
        if (saved) return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return [];
  });

  const [userEmail, setUserEmailState] = useState<string>(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem(LOCAL_STORAGE_KEY_EMAIL);
        if (saved) return saved;
      } catch (e) {
        console.error(e);
      }
    }
    return "mahimak2010@gmail.com";
  });

  const [plan, setPlan] = useState<UserPlan>(() => {
    if (typeof window !== "undefined") {
      try {
        const savedEmail = localStorage.getItem(LOCAL_STORAGE_KEY_EMAIL);
        if (savedEmail && isUserAdmin(savedEmail)) {
          return "complete";
        }
        const savedPlan = localStorage.getItem(LOCAL_STORAGE_KEY_PLAN) as UserPlan;
        if (savedPlan) return savedPlan;
      } catch (e) {
        console.error(e);
      }
    }
    return "complete";
  });

  const setUserEmail = (email: string) => {
    setUserEmailState(email);
    localStorage.setItem(LOCAL_STORAGE_KEY_EMAIL, email);
    if (isUserAdmin(email)) {
      setPlan("complete");
      localStorage.setItem(LOCAL_STORAGE_KEY_PLAN, "complete");
    }
  };

  const updateProfileData = (newData: Partial<CareerProfileData>) => {
    setProfileData((prev) => {
      const updated = { ...prev, ...newData };
      const score = calculateCompletion(updated);
      updated.profile = {
        ...updated.profile,
        completion_percentage: score,
      };
      localStorage.setItem(LOCAL_STORAGE_KEY_PROFILE, JSON.stringify(updated));
      return updated;
    });
  };

  const addDocument = (doc: Omit<DocumentRecord, "id" | "created_at" | "updated_at">): DocumentRecord => {
    const newDoc: DocumentRecord = {
      ...doc,
      id: "doc_" + Date.now() + "_" + Math.random().toString(36).substring(2, 7),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    setDocuments((prev) => {
      const updated = [newDoc, ...prev];
      localStorage.setItem(LOCAL_STORAGE_KEY_DOCS, JSON.stringify(updated));
      return updated;
    });
    return newDoc;
  };

  const deleteDocument = (id: string) => {
    setDocuments((prev) => {
      const updated = prev.filter((d) => d.id !== id);
      localStorage.setItem(LOCAL_STORAGE_KEY_DOCS, JSON.stringify(updated));
      return updated;
    });
  };

  const addApplication = (app: Omit<JobApplication, "id">) => {
    const newApp: JobApplication = {
      ...app,
      id: "app_" + Date.now(),
    };
    setApplications((prev) => {
      const updated = [newApp, ...prev];
      localStorage.setItem(LOCAL_STORAGE_KEY_APPS, JSON.stringify(updated));
      return updated;
    });
  };

  const updateApplicationStatus = (id: string, status: JobApplication["status"]) => {
    setApplications((prev) => {
      const updated = prev.map((a) => (a.id === id ? { ...a, status } : a));
      localStorage.setItem(LOCAL_STORAGE_KEY_APPS, JSON.stringify(updated));
      return updated;
    });
  };

  const [theme, setTheme] = useState<"light" | "dark">(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem(LOCAL_STORAGE_KEY_THEME) as "light" | "dark";
        if (saved === "light" || saved === "dark") {
          if (saved === "dark") {
            document.documentElement.classList.add("dark");
            document.documentElement.dataset.theme = "dark";
          } else {
            document.documentElement.classList.remove("dark");
            document.documentElement.dataset.theme = "light";
          }
          return saved;
        }
      } catch (e) {
        console.error(e);
      }
    }
    return "light";
  });

  const toggleTheme = () => {
    setTheme((prev) => {
      const next = prev === "dark" ? "light" : "dark";
      if (typeof window !== "undefined") {
        try {
          localStorage.setItem(LOCAL_STORAGE_KEY_THEME, next);
          if (next === "dark") {
            document.documentElement.classList.add("dark");
            document.documentElement.dataset.theme = "dark";
          } else {
            document.documentElement.classList.remove("dark");
            document.documentElement.dataset.theme = "light";
          }
        } catch (e) {
          console.error(e);
        }
      }
      return next;
    });
  };

  const upgradePlan = (newPlan: UserPlan) => {
    setPlan(newPlan);
    localStorage.setItem(LOCAL_STORAGE_KEY_PLAN, newPlan);
  };

  const isAdmin = isUserAdmin(userEmail);
  const completionScore = calculateCompletion(profileData);

  return (
    <AppContext.Provider
      value={{
        profileData,
        updateProfileData,
        documents,
        addDocument,
        deleteDocument,
        applications,
        addApplication,
        updateApplicationStatus,
        userEmail,
        setUserEmail,
        plan,
        upgradePlan,
        isAdmin,
        completionScore,
        theme,
        toggleTheme,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};
