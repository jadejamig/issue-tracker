import { z } from "zod";

// Create data validation schema
// we only need title and description in POST operation
// because the other fields are auto-populated or have a default value
export const createIssueSchema = z.object({
    title: z.string().min(1, 'Title is required.').max(255),
    description: z.string().min(1, 'Description in required.')
});
