import { createLifecycle } from "./lifecycle";

export async function runWorker(scanFn: () => Promise<void>) {
  const lifecycle = createLifecycle();

  lifecycle.start();

  try {
    await scanFn();
    lifecycle.complete();
  } catch {
    lifecycle.fail();
  }

  return {
    state: lifecycle.state
  };
}
