// action/doctorApiAction.ts
"use server";


import { Doctor } from "@/model/doctor";
import { Languages } from "@/model/language";
import { Location } from "@/model/location";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

/**
 * Get all languages
 */
export async function getLanguages(): Promise<Languages[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/languages`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch languages");
    }

    const data = await response.json();
    return data.data || data;
  } catch (error) {
    console.error("Error fetching languages:", error);
    return [];
  }
}

/**
 * Get all locations
 */
export async function getLocation(): Promise<Location[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/locations`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch locations");
    }

    const data = await response.json();
    return data.data || data;
  } catch (error) {
    console.error("Error fetching locations:", error);
    return [];
  }
}

/**
 * Get doctor profile by ID
 */
export async function getDoctorProfile(doctorId: number): Promise<Doctor | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/doctors/${doctorId}`, {
      method: "GET",
      headers: {
        "Accept-Language": "en",
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch doctor profile");
    }

    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error("Error fetching doctor profile:", error);
    return null;
  }
}

/**
 * Get doctor profile by user ID
 */
export async function getDoctorProfileByUserId(userId: number): Promise<Doctor | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/doctors?user_id=${userId}`, {
      method: "GET",
      headers: {
        "Accept-Language": "en",
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch doctor profile");
    }

    const result = await response.json();
    
    // If the API returns paginated data
    if (result.data && Array.isArray(result.data)) {
      return result.data[0] || null;
    }
    
    return result.data;
  } catch (error) {
    console.error("Error fetching doctor profile by user ID:", error);
    return null;
  }
}

/**
 * Add new doctor profile
 */
export async function addDoctorProfile(formData: FormData): Promise<any> {
  try {
    const response = await fetch(`${API_BASE_URL}/doctors`, {
      method: "POST",
      body: formData,
      // Don't set Content-Type header - browser will set it with boundary for FormData
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to create doctor profile");
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error adding doctor profile:", error);
    throw error;
  }
}

/**
 * Update doctor profile
 */
export async function updateDoctorProfile(
  doctorId: number,
  formData: FormData
): Promise<any> {
  try {
    // Laravel requires _method field for PUT via FormData
    formData.append("_method", "PUT");

    const response = await fetch(`${API_BASE_URL}/doctors/${doctorId}`, {
      method: "POST", // Using POST with _method=PUT for FormData
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to update doctor profile");
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error updating doctor profile:", error);
    throw error;
  }
}

/**
 * Delete doctor profile
 */
export async function deleteDoctorProfile(doctorId: number): Promise<any> {
  try {
    const response = await fetch(`${API_BASE_URL}/doctors/${doctorId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to delete doctor profile");
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error deleting doctor profile:", error);
    throw error;
  }
}

/**
 * Get all doctors with filters
 */
export async function getAllDoctors(params?: {
  status?: string;
  specialization?: string;
  location_id?: number;
  language?: string;
  page?: number;
  per_page?: number;
}): Promise<any> {
  try {
    const queryParams = new URLSearchParams();
    
    if (params?.status) queryParams.append("status", params.status);
    if (params?.specialization) queryParams.append("specialization", params.specialization);
    if (params?.location_id) queryParams.append("location_id", params.location_id.toString());
    if (params?.page) queryParams.append("page", params.page.toString());
    if (params?.per_page) queryParams.append("per_page", params.per_page.toString());

    const url = `${API_BASE_URL}/doctors${queryParams.toString() ? `?${queryParams}` : ""}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Accept-Language": params?.language || "en",
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch doctors");
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error fetching doctors:", error);
    throw error;
  }
}