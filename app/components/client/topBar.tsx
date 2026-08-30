"use client";
import React from "react";
import { TruckIcon, SmartPhone01Icon, Facebook02Icon, InstagramIcon, WhatsappIcon } from "hugeicons-react";

export function TopBar() {
  return (
    <div style={{
      backgroundColor: '#9c3552',
      color: '#ffffff',
      padding: '6px 20px',
      fontSize: '0.72rem',
      fontWeight: '500',
      letterSpacing: '0.8px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexWrap: 'wrap',
      gap: '24px'
    }}>
      {/* ENVÍO SEGURO */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
        <TruckIcon size={14} color="#ffffff" />
        <span style={{ textTransform: 'uppercase', letterSpacing: '0.5px' }}>ENVÍO 100% SEGURO</span>
      </div>

      <span style={{ opacity: 0.4 }}>|</span>

      {/* TELÉFONO */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
        <SmartPhone01Icon size={14} color="#ffffff" />
        <span>99999999</span>
      </div>

      <span style={{ opacity: 0.4 }}>|</span>

      {/* REDES SOCIALES */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <a href="#" title="Facebook" style={socialIconStyle}>
          <Facebook02Icon size={14} color="#ffffff" />
        </a>
        <a href="#" title="Instagram" style={socialIconStyle}>
          <InstagramIcon size={14} color="#ffffff" />
        </a>
        <a href="#" title="WhatsApp" style={socialIconStyle}>
          <WhatsappIcon size={14} color="#ffffff" />
        </a>
      </div>
    </div>
  );
}

const socialIconStyle: React.CSSProperties = {
  color: '#ffffff',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  textDecoration: 'none',
  opacity: 0.9,
  transition: 'opacity 0.2s ease'
};
