import React, { use } from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { Nav } from '@/components/headerComponents';
import { useSession, SessionContextValue, UseSessionOptions } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

jest.mock('next-auth/react', () => ({
    useSession: jest.fn(() => ({
        data: null, // Simulate no user logged in
        status: 'unauthenticated'
    }))
}));


jest.mock('next/navigation', () => ({
    usePathname: jest.fn(),
}));


describe('Nav Component Tests', () => {
    const unauthenticatedTabs = [
        { name: 'Home', href: '/' },
        { name: 'About', href: '/about' },
    ];

    const authenticatedTabs = [
        { name: 'Personal Details', href: '/personal-details' },
        { name: 'Manage Content', href: "/manage-content" },
        { name: 'Preview', href: `/preview/*` },
        { name: 'Demo', href: '/demo' },
    ]

    it('renders without crashing', () => {
        render(<Nav tabs={unauthenticatedTabs} />);
        expect(screen.getByText('Resume Builder')).toBeInTheDocument();
    });

    it('displays log in when users are not logged in', () => {
        (useSession as jest.Mock).mockImplementation(() => ({ data: null }));
        render(<Nav tabs={unauthenticatedTabs} />);
        expect(screen.getByTestId('mobile-login')).toBeInTheDocument();
    }
    );

    it('displays log out when users are logged in', () => {
        (useSession as jest.Mock).mockImplementation(() => ({
            data: {
                status: 'authenticated'
            }
        }));
        render(<Nav tabs={authenticatedTabs} />);
        expect(screen.getByTestId('mobile-logout')).toBeInTheDocument();
    }
    );

    it('(Unauthenticated user) renders all navigation tabs and highlights the active tab', () => {
        (useSession as jest.Mock).mockImplementation(() => ({ data: null, status: 'unauthenticated' }));
        (usePathname as jest.Mock).mockImplementation(() => '/');
        render(<Nav tabs={unauthenticatedTabs} />);
        unauthenticatedTabs.forEach(tab => {
            expect(screen.getByTestId(tab.name)).toBeInTheDocument();
        });
        expect(screen.getByTestId('Home')).toHaveClass('border-indigo-500');
    });

    it('(Authenticated user) renders all navigation tabs and highlights the active tab', () => {
        (useSession as jest.Mock).mockImplementation(() => ({
            data: {
                status: 'authenticated'
            }
        }));
        (usePathname as jest.Mock).mockImplementation(() => '/personal-details');
        render(<Nav tabs={authenticatedTabs} />);
        authenticatedTabs.forEach(tab => {
            expect(screen.getByTestId(tab.name)).toBeInTheDocument();
        });
        expect(screen.getByTestId('Personal Details')).toHaveClass('border-indigo-500');
    });

    
});