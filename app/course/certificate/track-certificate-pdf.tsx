"use client";

import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";
import type { TrackCertificate, CertificatePlatform, CertificateTrack } from "@/lib/types";

Font.register({
  family: "Inter",
  fonts: [
    { src: "https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2", fontWeight: 400 },
    { src: "https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuGKYAZ9hiA.woff2", fontWeight: 700 },
  ],
});

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#ffffff",
    padding: 60,
    fontFamily: "Inter",
  },
  header: {
    marginBottom: 40,
    textAlign: "center",
  },
  logo: {
    fontSize: 14,
    fontWeight: 700,
    letterSpacing: 2,
    marginBottom: 20,
    color: "#E63946",
  },
  title: {
    fontSize: 32,
    fontWeight: 700,
    marginBottom: 10,
    color: "#171717",
  },
  subtitle: {
    fontSize: 14,
    color: "#737373",
    marginBottom: 40,
  },
  body: {
    textAlign: "center",
    marginBottom: 40,
  },
  certifyText: {
    fontSize: 12,
    color: "#737373",
    marginBottom: 20,
  },
  userName: {
    fontSize: 28,
    fontWeight: 700,
    color: "#171717",
    marginBottom: 20,
  },
  completionText: {
    fontSize: 12,
    color: "#737373",
    marginBottom: 10,
  },
  trackTitle: {
    fontSize: 18,
    fontWeight: 700,
    color: "#171717",
    marginBottom: 8,
  },
  platformBadge: {
    fontSize: 12,
    color: "#E63946",
    marginBottom: 30,
  },
  footer: {
    marginTop: "auto",
    borderTop: "1 solid #e5e5e5",
    paddingTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  footerCol: {
    textAlign: "center",
  },
  footerLabel: {
    fontSize: 9,
    color: "#a3a3a3",
    marginBottom: 4,
  },
  footerValue: {
    fontSize: 11,
    color: "#171717",
  },
  certificateNumber: {
    fontSize: 10,
    color: "#a3a3a3",
    textAlign: "center",
    marginTop: 20,
  },
});

interface TrackCertificatePDFProps {
  certificate: TrackCertificate;
}

const platformTitles: Record<CertificatePlatform, string> = {
  web: "Web",
  ios: "iOS",
  android: "Android",
};

const trackTitles: Record<CertificateTrack, string> = {
  design: "Design Track",
  engineering: "Engineering Track",
  convergence: "Convergence Track",
};

const trackDescriptions: Record<CertificateTrack, string> = {
  design: "mastering visual design principles and creating beautiful interfaces",
  engineering: "building robust, performant, and accessible applications",
  convergence: "bridging design and development with a holistic approach",
};

export function TrackCertificatePDF({ certificate }: TrackCertificatePDFProps) {
  const { metadata } = certificate;
  const issuedDate = new Date(metadata.issued_at).toLocaleDateString("en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  
  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    if (hours < 1) return "< 1 hour";
    return `${hours} hours`;
  };

  return (
    <Document>
      <Page size="A4" orientation="landscape" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.logo}>DESIGN ENGINEER</Text>
          <Text style={styles.title}>Track Certificate</Text>
          <Text style={styles.subtitle}>
            The Design Engineer Course
          </Text>
        </View>

        <View style={styles.body}>
          <Text style={styles.certifyText}>This is to certify that</Text>
          <Text style={styles.userName}>{metadata.user_name}</Text>
          <Text style={styles.completionText}>
            has successfully completed the
          </Text>
          <Text style={styles.trackTitle}>
            {trackTitles[metadata.track]}
          </Text>
          <Text style={styles.platformBadge}>
            {platformTitles[metadata.platform]} Platform
          </Text>
          <Text style={styles.completionText}>
            demonstrating proficiency in {trackDescriptions[metadata.track]}
          </Text>
        </View>

        <View style={styles.footer}>
          <View style={styles.footerCol}>
            <Text style={styles.footerLabel}>ISSUED</Text>
            <Text style={styles.footerValue}>{issuedDate}</Text>
          </View>
          <View style={styles.footerCol}>
            <Text style={styles.footerLabel}>TOTAL TIME</Text>
            <Text style={styles.footerValue}>
              {formatTime(metadata.total_time_spent_seconds)}
            </Text>
          </View>
          <View style={styles.footerCol}>
            <Text style={styles.footerLabel}>VERIFY AT</Text>
            <Text style={styles.footerValue}>
              designengineer.xyz/verify/{certificate.slug}
            </Text>
          </View>
        </View>

        <Text style={styles.certificateNumber}>
          Certificate #{metadata.certificate_number}
        </Text>
      </Page>
    </Document>
  );
}

