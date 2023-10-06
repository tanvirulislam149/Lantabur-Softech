export default function handler(req, res) {
  const data = { message: "Hello from api route" };

  res.status(200).json(data);
}