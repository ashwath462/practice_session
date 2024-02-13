import "@testing-library/jest-dom";
import { fireEvent, render, waitFor } from "@testing-library/svelte";
import registerPage from "../../routes/register/+page.svelte";
import loginPage from "../../routes/login/+page.svelte";
import homePage from "../../routes/home/+page.svelte";
import { beforeAll, expect, test, vi } from "vitest";
import { user } from "$lib/store/store";
import { tick } from "svelte";

test("should render navbar", async () => {
  const { getByText, getByTestId } = render(registerPage);
  await waitFor(() => {
    expect(getByText("To Do List")).toBeInTheDocument();
    const loginButton = getByTestId("login-signup-button");
    expect(loginButton).toBeInTheDocument();
  });
});

test("should render sign up page", async () => {
  const { getByText, getByTestId } = render(registerPage);
  await waitFor(() => {
    expect(getByText("Signup Page")).toBeInTheDocument();
    expect(getByText("Email :")).toBeInTheDocument();
    expect(getByText("Password :")).toBeInTheDocument();
    expect(getByText("Confirm Password :")).toBeInTheDocument();
    expect(getByText("Show Password")).toBeInTheDocument();
  });
  await fireEvent.click(getByTestId("signup-button"));
});

test("should render sign in page", async () => {
  const { getByText, getByTestId } = render(loginPage);
  await waitFor(() => {
    expect(getByText("Login Page")).toBeInTheDocument();
    expect(getByText("Email :")).toBeInTheDocument();
    expect(getByText("Password :")).toBeInTheDocument();
    expect(getByText("Show Password")).toBeInTheDocument();
  });
  await fireEvent.click(getByTestId("login-button"));
});

test("should render home page ", async () => {
  const { getByText } = render(homePage);
  await waitFor(() => {
    expect(getByText("Loading!")).toBeInTheDocument();
  });
});

test("should render home page tables", async () => {
  const mockUser = { uid: "23455555" };
  localStorage.setItem(USER_ID, "23455555");
  user.set(mockUser);
  const { getByText } = render(homePage);
  await tick();
  await waitFor(() => {
    expect(getByText("Loading!")).toBeInTheDocument();
  });
  localStorage.removeItem(USER_ID);
});
