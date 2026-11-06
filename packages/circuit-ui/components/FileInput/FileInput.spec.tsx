/**
 * Copyright 2026, SumUp Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { createRef } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";

import {
  axe,
  fireEvent,
  render,
  screen,
  userEvent,
  waitFor,
  within,
} from "../../util/test-utils.js";

import { FileInput, type FileInputProps } from "./FileInput.js";
import { formatFileSize, setInputFiles } from "./FileInputService.js";

type Options = { signal: AbortSignal };

describe("FileInput", () => {
  const baseProps: FileInputProps = {
    label: "Receipts",
    description: "PDF, JPG, PNG (max 10MB each)",
    removeLabel: "Delete",
    retryLabel: "Retry",
    menuLabel: "More actions",
  };

  const march = new File(["march"], "march.pdf", { type: "application/pdf" });
  const april = new File(["april"], "april.jpg", { type: "image/jpeg" });
  const may = new File(["may"], "may.png", { type: "image/png" });

  it("renders a labelled file input", () => {
    render(<FileInput {...baseProps} />);

    expect(screen.getByLabelText("Receipts")).toHaveAttribute("type", "file");
  });

  it("forwards a ref to the input element", () => {
    const ref = createRef<HTMLInputElement>();
    render(<FileInput {...baseProps} ref={ref} />);

    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });

  it("merges a custom className", () => {
    const { container } = render(<FileInput {...baseProps} className="foo" />);

    expect(container.firstChild).toHaveClass("foo");
  });

  it("displays the optional label when the input is not required", () => {
    render(<FileInput {...baseProps} optionalLabel="optional" />);

    expect(screen.getByText("(optional)")).toBeInTheDocument();
  });

  it("does not display the optional label when the input is required", () => {
    render(<FileInput {...baseProps} optionalLabel="optional" required />);

    expect(screen.queryByText("(optional)")).not.toBeInTheDocument();
  });

  it("describes the input with the description and validation hint", () => {
    render(<FileInput {...baseProps} validationHint="Pick a file" />);

    expect(screen.getByLabelText("Receipts")).toHaveAccessibleDescription(
      "PDF, JPG, PNG (max 10MB each) Pick a file",
    );
  });

  describe("opening the file picker", () => {
    it("opens the picker when the button is clicked", async () => {
      render(<FileInput {...baseProps} />);

      const onClick = vi.fn();
      screen.getByLabelText("Receipts").addEventListener("click", onClick);
      await userEvent.click(screen.getByText("Upload files"));

      expect(onClick).toHaveBeenCalledTimes(1);
    });

    it("opens the picker when the dropzone is clicked", async () => {
      render(<FileInput {...baseProps} />);

      const onClick = vi.fn();
      screen.getByLabelText("Receipts").addEventListener("click", onClick);
      await userEvent.click(
        screen.getByText("Drop your files or click to upload"),
      );

      expect(onClick).toHaveBeenCalledTimes(1);
    });

    it("includes the button text in the accessible name", () => {
      render(<FileInput {...baseProps} />);

      expect(screen.getByLabelText("Receipts")).toHaveAccessibleName(
        "Receipts Upload files",
      );
    });

    it("lists the name and size of the selected file", async () => {
      render(<FileInput {...baseProps} />);

      await userEvent.upload(screen.getByLabelText("Receipts"), march);

      expect(screen.getAllByRole("listitem")).toHaveLength(1);
      expect(screen.getByText("march.pdf")).toBeVisible();
      expect(screen.getByText("5 B")).toBeVisible();
    });

    it("calls onChange for every selected file", async () => {
      const onChange = vi.fn();
      render(<FileInput {...baseProps} multiple onChange={onChange} />);

      await userEvent.upload(screen.getByLabelText("Receipts"), [march, april]);

      expect(onChange).toHaveBeenCalledTimes(2);
      expect(onChange).toHaveBeenCalledWith(
        march,
        expect.objectContaining({ signal: expect.any(AbortSignal) }),
      );
      expect(onChange).toHaveBeenCalledWith(april, expect.anything());
    });

    it("lists new files above the existing ones", async () => {
      render(<FileInput {...baseProps} multiple />);

      const input = screen.getByLabelText("Receipts");
      await userEvent.upload(input, march);
      await userEvent.upload(input, april);

      const names = screen
        .getAllByRole("listitem")
        .map((item) => item.textContent);

      expect(names[0]).toContain("april.jpg");
      expect(names[1]).toContain("march.pdf");
    });

    it("replaces the selected file when multiple is not set", async () => {
      render(<FileInput {...baseProps} />);

      const input = screen.getByLabelText("Receipts");
      await userEvent.upload(input, march);
      await userEvent.upload(input, april);

      expect(screen.getAllByRole("listitem")).toHaveLength(1);
      expect(screen.queryByText("march.pdf")).not.toBeInTheDocument();
      expect(screen.getByText("april.jpg")).toBeVisible();
    });

    it("adds to the selected files when multiple is set", async () => {
      render(<FileInput {...baseProps} multiple />);

      const input = screen.getByLabelText("Receipts");
      await userEvent.upload(input, [march, april]);
      await userEvent.upload(input, may);

      expect(screen.getAllByRole("listitem")).toHaveLength(3);
    });

    it("removes a file from the list and calls onRemove", async () => {
      const onRemove = vi.fn();
      render(<FileInput {...baseProps} multiple onRemove={onRemove} />);

      await userEvent.upload(screen.getByLabelText("Receipts"), [march, april]);
      await userEvent.click(
        screen.getAllByRole("button", { name: "Delete" })[0],
      );

      expect(screen.queryByText("march.pdf")).not.toBeInTheDocument();
      expect(screen.getByText("april.jpg")).toBeVisible();
      expect(onRemove).toHaveBeenCalledWith(march);
    });
  });

  describe("dropping files", () => {
    const getDropzone = () =>
      screen.getByText("Drop your files or click to upload")
        .parentElement as HTMLElement;

    const fileDrag = (...files: File[]) => ({
      dataTransfer: {
        files,
        items: files.map(() => ({ kind: "file" })),
      },
    });

    it("lists the dropped file", () => {
      render(<FileInput {...baseProps} />);

      fireEvent.drop(getDropzone(), fileDrag(march));

      expect(screen.getByText("march.pdf")).toBeVisible();
    });

    it("ignores a drop without files", () => {
      const onChange = vi.fn();
      render(<FileInput {...baseProps} onChange={onChange} />);

      fireEvent.drop(getDropzone(), fileDrag());

      expect(screen.queryByRole("list")).not.toBeInTheDocument();
      expect(onChange).not.toHaveBeenCalled();
    });

    it("only keeps the first dropped file when multiple is not set", () => {
      render(<FileInput {...baseProps} />);

      fireEvent.drop(getDropzone(), fileDrag(march, april));

      expect(screen.getAllByRole("listitem")).toHaveLength(1);
      expect(screen.getByText("march.pdf")).toBeVisible();
    });

    it("keeps all dropped files when multiple is set", () => {
      render(<FileInput {...baseProps} multiple />);

      fireEvent.drop(getDropzone(), fileDrag(march, april));

      expect(screen.getAllByRole("listitem")).toHaveLength(2);
    });

    it("prevents the default behavior when files are dragged over", () => {
      render(<FileInput {...baseProps} />);

      const notPrevented = fireEvent.dragOver(getDropzone(), fileDrag(march));

      expect(notPrevented).toBe(false);
    });

    it("leaves other drags to the browser", () => {
      const onChange = vi.fn();
      render(<FileInput {...baseProps} onChange={onChange} />);
      const link = {
        dataTransfer: { files: [], items: [{ kind: "string" }] },
      };

      expect(fireEvent.dragOver(getDropzone(), link)).toBe(true);
      expect(fireEvent.drop(getDropzone(), link)).toBe(true);
      expect(screen.queryByRole("list")).not.toBeInTheDocument();
      expect(onChange).not.toHaveBeenCalled();
    });
  });

  describe("translations", () => {
    it("falls back to the default labels", () => {
      render(<FileInput {...baseProps} />);

      expect(screen.getByText("Upload files")).toBeVisible();
      expect(
        screen.getByText("Drop your files or click to upload"),
      ).toBeVisible();
    });

    it("prefers custom labels over the translations", () => {
      render(
        <FileInput
          {...baseProps}
          locale="de-DE"
          buttonLabel="Add receipts"
          dropLabel="Drop receipts here"
        />,
      );

      expect(screen.getByText("Add receipts")).toBeVisible();
      expect(screen.getByText("Drop receipts here")).toBeVisible();
      expect(screen.queryByText("Dateien hochladen")).not.toBeInTheDocument();
    });
  });

  describe("error labels", () => {
    it("shows a message based on the reason the upload failed", async () => {
      const onChange = vi.fn().mockRejectedValue(new Error("Too large"));
      render(
        <FileInput
          {...baseProps}
          uploadingLabel="Uploading…"
          successLabel="Uploaded"
          errorLabel={(error) => (error as Error).message}
          onChange={onChange}
        />,
      );

      await userEvent.upload(screen.getByLabelText("Receipts"), march);

      expect(await screen.findByText("Too large")).toBeVisible();
    });

    it("shows no status text when the function returns none", async () => {
      const onChange = vi.fn().mockRejectedValue(new Error("Unknown"));
      render(
        <FileInput
          {...baseProps}
          uploadingLabel="Uploading…"
          successLabel="Uploaded"
          errorLabel={() => ""}
          onChange={onChange}
        />,
      );

      await userEvent.upload(screen.getByLabelText("Receipts"), march);

      expect(
        await screen.findByRole("button", { name: "More actions" }),
      ).toBeVisible();
      expect(screen.queryByText("Uploading…")).not.toBeInTheDocument();
    });
  });

  describe("uploading files", () => {
    const uploadProps: FileInputProps = {
      ...baseProps,
      uploadingLabel: "Uploading…",
      successLabel: "Uploaded",
      errorLabel: "Upload failed",
    };

    function createUpload() {
      const calls: (Options & {
        file: File;
        resolve: () => void;
        reject: (reason: unknown) => void;
      })[] = [];
      const upload = vi.fn(
        (file: File, options: Options) =>
          new Promise<void>((resolve, reject) => {
            calls.push({ file, ...options, resolve, reject });
          }),
      );
      return { upload, calls };
    }

    it("shows the state of the upload", async () => {
      const { upload, calls } = createUpload();
      render(<FileInput {...uploadProps} onChange={upload} />);

      await userEvent.upload(screen.getByLabelText("Receipts"), march);

      expect(screen.getByText("Uploading…")).toBeVisible();

      calls[0].resolve();

      expect(await screen.findByText("Uploaded")).toBeVisible();
      expect(screen.queryByText("Uploading…")).not.toBeInTheDocument();
    });

    it("does not track a state when onChange does not return a promise", async () => {
      render(<FileInput {...uploadProps} onChange={() => {}} />);

      await userEvent.upload(screen.getByLabelText("Receipts"), march);

      expect(screen.queryByText("Uploading…")).not.toBeInTheDocument();
    });

    it("shows an error when the upload fails", async () => {
      const { upload, calls } = createUpload();
      render(<FileInput {...uploadProps} onChange={upload} />);

      await userEvent.upload(screen.getByLabelText("Receipts"), march);
      calls[0].reject(new Error("Network error"));

      expect(await screen.findByText("Upload failed")).toBeVisible();
    });

    it("offers to retry or remove a failed file in a menu", async () => {
      const { upload, calls } = createUpload();
      render(<FileInput {...uploadProps} onChange={upload} />);

      await userEvent.upload(screen.getByLabelText("Receipts"), march);
      calls[0].reject(new Error("Network error"));
      await userEvent.click(
        await screen.findByRole("button", { name: "More actions" }),
      );

      expect(screen.getByRole("button", { name: "Retry" })).toBeVisible();
      expect(screen.getByRole("button", { name: "Delete" })).toBeVisible();
    });

    it("uploads the file again when the retry action is chosen", async () => {
      const { upload, calls } = createUpload();
      render(<FileInput {...uploadProps} onChange={upload} />);

      await userEvent.upload(screen.getByLabelText("Receipts"), march);
      calls[0].reject(new Error("Network error"));
      await userEvent.click(
        await screen.findByRole("button", { name: "More actions" }),
      );
      await userEvent.click(screen.getByRole("button", { name: "Retry" }));

      expect(upload).toHaveBeenCalledTimes(2);
      expect(calls[1].file).toBe(march);
      expect(await screen.findByText("Uploading…")).toBeVisible();

      calls[1].resolve();

      expect(await screen.findByText("Uploaded")).toBeVisible();
    });

    it("shows the error message that the consumer derives from the reason", async () => {
      const { upload, calls } = createUpload();
      render(
        <FileInput
          {...uploadProps}
          multiple
          onChange={upload}
          errorLabel={(error) =>
            error instanceof RangeError
              ? "The file is too large"
              : "Upload failed"
          }
        />,
      );

      await userEvent.upload(screen.getByLabelText("Receipts"), [march, april]);
      calls[0].reject(new RangeError("Too large"));
      calls[1].reject(new Error("Network error"));

      expect(await screen.findByText("The file is too large")).toBeVisible();
      expect(screen.getByText("Upload failed")).toBeVisible();
    });

    it("treats an onChange that throws as a failed upload", async () => {
      render(
        <FileInput
          {...uploadProps}
          onChange={() => {
            throw new Error("Synchronous error");
          }}
        />,
      );

      await userEvent.upload(screen.getByLabelText("Receipts"), march);

      expect(await screen.findByText("Upload failed")).toBeVisible();
    });

    it("aborts the upload when the file is removed", async () => {
      const onRemove = vi.fn();
      const { upload, calls } = createUpload();
      render(
        <FileInput {...uploadProps} onChange={upload} onRemove={onRemove} />,
      );

      await userEvent.upload(screen.getByLabelText("Receipts"), march);
      await userEvent.click(screen.getByRole("button", { name: "Delete" }));

      expect(calls[0].signal.aborted).toBe(true);

      calls[0].resolve();
      await new Promise((resolve) => {
        setTimeout(resolve, 0);
      });

      expect(screen.queryByRole("list")).not.toBeInTheDocument();
    });

    it("aborts the upload of a file that is replaced", async () => {
      const onRemove = vi.fn();
      const { upload, calls } = createUpload();
      render(
        <FileInput {...uploadProps} onChange={upload} onRemove={onRemove} />,
      );

      const input = screen.getByLabelText("Receipts");
      await userEvent.upload(input, march);
      await userEvent.upload(input, april);

      expect(calls[0].signal.aborted).toBe(true);
      expect(calls[1].signal.aborted).toBe(false);
    });

    it("calls onRemove for a file that finished uploading", async () => {
      const onRemove = vi.fn();
      const { upload, calls } = createUpload();
      render(
        <FileInput {...uploadProps} onChange={upload} onRemove={onRemove} />,
      );

      await userEvent.upload(screen.getByLabelText("Receipts"), march);
      calls[0].resolve();
      await screen.findByText("Uploaded");
      await userEvent.click(screen.getByRole("button", { name: "Delete" }));

      expect(onRemove).toHaveBeenCalledWith(march);
    });

    it("aborts pending uploads when unmounted", async () => {
      const { upload, calls } = createUpload();
      const { unmount } = render(
        <FileInput {...uploadProps} onChange={upload} />,
      );

      await userEvent.upload(screen.getByLabelText("Receipts"), march);
      unmount();

      expect(calls[0].signal.aborted).toBe(true);
    });

    it("announces state changes to assistive technology", async () => {
      const { upload, calls } = createUpload();
      render(<FileInput {...uploadProps} onChange={upload} />);

      await userEvent.upload(screen.getByLabelText("Receipts"), march);

      const row = screen.getByRole("listitem");
      expect(within(row).getByRole("status")).toHaveTextContent(
        "march.pdf: Uploading…",
      );

      calls[0].resolve();

      await waitFor(() => {
        expect(within(row).getByRole("status")).toHaveTextContent(
          "march.pdf: Uploaded",
        );
      });
    });

    it("announces the status of every file separately", async () => {
      const { upload, calls } = createUpload();
      render(<FileInput {...uploadProps} multiple onChange={upload} />);

      await userEvent.upload(screen.getByLabelText("Receipts"), [march, april]);
      calls[0].resolve();
      calls[1].reject(new Error("Network error"));

      const [marchRow, aprilRow] = screen.getAllByRole("listitem");
      await waitFor(() => {
        expect(within(aprilRow).getByRole("status")).toHaveTextContent(
          "april.jpg: Upload failed",
        );
        expect(within(marchRow).getByRole("status")).toHaveTextContent(
          "march.pdf: Uploaded",
        );
      });
    });

    it("has no accessibility violations", async () => {
      const { upload, calls } = createUpload();
      const { container } = render(
        <FileInput {...uploadProps} multiple onChange={upload} />,
      );

      await userEvent.upload(screen.getByLabelText("Receipts"), [
        march,
        april,
        may,
      ]);
      calls[0].resolve();
      calls[1].reject(new Error("Network error"));
      await screen.findByText("Upload failed");

      const actual = await axe(container);
      expect(actual).toHaveNoViolations();
    });
  });

  describe("trailing actions", () => {
    it("shows the remove button by default", async () => {
      render(<FileInput {...baseProps} />);

      await userEvent.upload(screen.getByLabelText("Receipts"), march);

      expect(
        screen.getByRole("button", { name: "Delete" }),
      ).toBeInTheDocument();
    });

    it("shows additional actions in a menu, followed by the remove action", async () => {
      const onDownload = vi.fn();
      render(
        <FileInput
          {...baseProps}
          menuLabel="More actions"
          trailingActions={(file: File) => [
            { children: `Download ${file.name}`, onClick: onDownload },
          ]}
        />,
      );

      await userEvent.upload(screen.getByLabelText("Receipts"), march);

      expect(
        screen.queryByRole("button", { name: "Delete" }),
      ).not.toBeInTheDocument();

      await userEvent.click(
        screen.getByRole("button", { name: "More actions" }),
      );
      await userEvent.click(
        screen.getByRole("button", { name: "Download march.pdf" }),
      );

      expect(onDownload).toHaveBeenCalledTimes(1);
    });

    it("removes the file from the menu", async () => {
      const onRemove = vi.fn();
      render(
        <FileInput
          {...baseProps}
          onRemove={onRemove}
          menuLabel="More actions"
          trailingActions={() => [{ children: "Download" }]}
        />,
      );

      await userEvent.upload(screen.getByLabelText("Receipts"), march);
      await userEvent.click(
        screen.getByRole("button", { name: "More actions" }),
      );
      await userEvent.click(screen.getByRole("button", { name: "Delete" }));

      expect(screen.queryByText("march.pdf")).not.toBeInTheDocument();
      expect(onRemove).toHaveBeenCalledTimes(1);
    });
  });
});

describe("formatFileSize", () => {
  it.each([
    [0, "0 B"],
    [999, "999 B"],
    [1000, "1 KB"],
    [202_445, "202.4 KB"],
    [1_452_100, "1.5 MB"],
    [3_200_000_000, "3.2 GB"],
  ])("formats %d bytes as %s", (bytes, expected) => {
    expect(formatFileSize(bytes, "en-US")).toBe(expected);
  });
});

describe("setInputFiles", () => {
  const file = new File(["march"], "march.pdf", { type: "application/pdf" });

  // jsdom doesn't implement `DataTransfer` or let scripts assign a `FileList`
  class FakeDataTransfer {
    files: File[] = [];

    items = {
      add: (added: File) => {
        this.files.push(added);
      },
    };
  }

  const createInput = (files: File[] = []) =>
    ({ files }) as unknown as HTMLInputElement;

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("replaces the files of the input", () => {
    vi.stubGlobal("DataTransfer", FakeDataTransfer);
    const input = createInput();

    setInputFiles(input, [file]);

    expect(input.files).toEqual([file]);
  });

  it("clears the input when the last file is removed", () => {
    vi.stubGlobal("DataTransfer", FakeDataTransfer);
    const input = createInput([file]);

    setInputFiles(input, []);

    expect(input.files).toEqual([]);
  });

  it("leaves an empty input untouched", () => {
    vi.stubGlobal("DataTransfer", FakeDataTransfer);
    const input = createInput();
    const { files } = input;

    setInputFiles(input, []);

    expect(input.files).toBe(files);
  });

  it("does nothing in environments without DataTransfer", () => {
    vi.stubGlobal("DataTransfer", undefined);
    const input = createInput();
    const { files } = input;

    setInputFiles(input, [file]);

    expect(input.files).toBe(files);
  });
});
