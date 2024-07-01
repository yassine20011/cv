import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import Modal from "@/app/formComponents/modal";
import { toast } from "sonner";
import {
    educationFormStructure,
    experienceFormStructure,
    projectFormStructure,
} from "@/app/formComponents/inputs";



// Mock external functions
jest.mock('sonner', () => ({
    toast: {
        success: jest.fn(),
        error: jest.fn(),
    },
}));

jest.mock('next-auth/next', () => ({
    getServerSession: jest.fn(),
}));

// Mock handleAction functions
const handleActionEducation = jest.fn();
const handleActionProject = jest.fn();
const handleActionExperience = jest.fn();

describe('Modal Component handleSubmit Tests', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    const testCases = [
        { label: 'Education', action: handleActionEducation, formStructure: educationFormStructure },
        { label: 'Project', action: handleActionProject, formStructure: projectFormStructure },
        { label: 'Experience', action: handleActionExperience, formStructure: experienceFormStructure },
    ];

    testCases.forEach(({ label, action, formStructure }) => {
        it(`handleSubmit - ${label}`, async () => {
            render(<Modal buttonLabel={label} buttonType="add" formStructure={formStructure} name="test" action={action} />);

            // show modal
            const button = screen.getByTestId(`showModal-${label.toLowerCase()}`);
            fireEvent.click(button);

            // submit form
            const form = screen.getByRole('form');
            fireEvent.submit(form);
            await waitFor(() => {
                expect(action).toHaveBeenCalledTimes(1);
                expect(toast.success).toHaveBeenCalledWith(`${label} added successfully`);
            });
        });
    });

    testCases.forEach(({ label, action, formStructure }) => {
        it(`handleSubmit - ${label} - error`, async () => {

            render(<Modal buttonLabel={label} buttonType="add" formStructure={formStructure} name="test" action={action} />);

            // ensure modal is shown
            const button = screen.getByTestId(`showModal-${label.toLowerCase()}`);
            fireEvent.click(button);

            // mock action to throw error  
            action.mockImplementation(() => {
                throw new Error('error');
            });
            // submit form
            const form = screen.getByRole('form');
            fireEvent.submit(form);

            await waitFor(() => expect(toast.error).toHaveBeenCalledWith(`Failed to add ${label}`));

        });
    });


});