export const LoginView = () => {
  return (
    <form>
      <label>
        Name:
        <input type="text" />
      </label>
      <label>
        Password:
        <input type="password" />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};
