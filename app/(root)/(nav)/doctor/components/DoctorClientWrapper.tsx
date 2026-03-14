"use client";

import { useEffect } from "react";
import { useBookingStore } from "@/stores/booking";
import { DoctorDetailsType } from "@/models/schema";

interface DoctorClientWrapperProps {
    doctorInfo: DoctorDetailsType;
}

export default function DoctorClientWrapper({ doctorInfo }: DoctorClientWrapperProps) {
    const { setDocInfo } = useBookingStore();

    useEffect(() => {
        if (doctorInfo) {
            setDocInfo(doctorInfo);
        }
    }, [doctorInfo, setDocInfo]);

    return null; // This component strictly handles state synchronization
}
