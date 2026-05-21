# Spec: Agent Manifest

The agent manifest is an application-level JSON file that provides a structured map of an application's pages, workflows, and agent-relevant entry points.

**Status:** Draft v0.1 — subject to change

---

## Overview

The page context metadata block ([spec/page-context.md](page-context.md)) describes a single page. The agent manifest describes the entire application — it is to agent-friendly UI what `sitemap.xml` is to search engine optimization.

The manifest is intended to be served at a well-known path:

```
/.well-known/agent-manifest.json
```

Agents and tooling can fetch this manifest to understand the application's structure before beginning a task.

---

## Schema

```jsonc
{
  // Required
  "specVersion": "0.1",
  "name": "string",           // Application name
  "baseUrl": "string",        // Base URL of the application

  // Optional
  "description": "string",    // Brief description of the application's purpose
  "agentMode": {
    "paramName": "string",    // URL parameter to enable agent mode (default: "agentMode")
    "paramValue": "string"    // Value to set (default: "true")
  },

  "pages": [
    {
      "id": "string",         // Stable page identifier (matches page-context "page" field)
      "title": "string",      // Human-readable title
      "path": "string",       // URL path (may include :param placeholders)
      "description": "string" // What an agent can do on this page
    }
  ],

  "workflows": [
    {
      "id": "string",         // Stable workflow identifier
      "title": "string",      // Human-readable title
      "description": "string",// What this workflow accomplishes
      "entryPage": "string",  // Page ID where this workflow starts
      "steps": [
        {
          "step": 1,          // Step number
          "pageId": "string", // Page ID for this step
          "description": "string"
        }
      ]
    }
  ],

  "authentication": {
    "required": true,
    "loginPage": "string",    // Page ID for the login page
    "description": "string"   // Notes for agents about authentication
  },

  "agentNotes": "string"      // Free-text notes for agents about the application
}
```

---

## Example

See [templates/agent-manifest.example.json](../templates/agent-manifest.example.json) for a complete example.

```json
{
  "specVersion": "0.1",
  "name": "Acme Invoicing",
  "baseUrl": "https://app.acmeinvoicing.example.com",
  "description": "Invoice creation, management, and payment collection application.",

  "agentMode": {
    "paramName": "agentMode",
    "paramValue": "true"
  },

  "pages": [
    {
      "id": "login",
      "title": "Login",
      "path": "/login",
      "description": "Authenticate with email and password."
    },
    {
      "id": "invoice-list",
      "title": "Invoices",
      "path": "/invoices",
      "description": "View, filter, and manage all invoices."
    },
    {
      "id": "invoice-create",
      "title": "Create Invoice",
      "path": "/invoices/new",
      "description": "Create a new invoice."
    },
    {
      "id": "invoice-detail",
      "title": "Invoice Detail",
      "path": "/invoices/:id",
      "description": "View, edit, or delete a single invoice."
    }
  ],

  "workflows": [
    {
      "id": "create-invoice",
      "title": "Create and submit an invoice",
      "description": "Creates a new invoice and submits it to a client.",
      "entryPage": "invoice-create",
      "steps": [
        {
          "step": 1,
          "pageId": "invoice-create",
          "description": "Fill in invoice details and submit."
        },
        {
          "step": 2,
          "pageId": "invoice-detail",
          "description": "Confirm the invoice was created."
        }
      ]
    }
  ],

  "authentication": {
    "required": true,
    "loginPage": "login",
    "description": "Session cookie-based authentication. Log in before attempting any workflow."
  }
}
```

---

## Usage

Agents fetching the manifest can use it to:

1. Discover what pages and workflows exist in the application
2. Navigate directly to the correct entry point for a workflow
3. Understand authentication requirements before attempting tasks
4. Map `data-agent-id` values on pages back to their workflow context

The manifest is optional — pages and workflows function without it. But it significantly reduces the orientation overhead for agents operating on an unfamiliar application.

---

## Serving the Manifest

The manifest should be served as a static JSON file or generated at build time. It must be:

- Publicly accessible (or accessible to authenticated agents after login)
- Valid JSON
- Kept in sync with the actual application structure

A stale or inaccurate manifest is worse than no manifest.
