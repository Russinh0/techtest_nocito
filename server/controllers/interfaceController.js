export default async function controllerInterface(res, service, options) {
  try {
    const data = await service(options);
    return res.status(data.statusCode).send(data.body);
  } catch (e) {
    console.error(e);
    return res.status(500).send({ body: "Internal error" });
  }
}
