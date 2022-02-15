import * as functions from 'firebase-functions';
import { db } from './firebase';

const secondsAgo = (seconds: number) =>
  new Date(new Date().getTime() - seconds * 1000);

const queuePurge = async (
  batch: FirebaseFirestore.WriteBatch,
  collection: string,
  age: number,
) => {
  const snap = await db
    .collection(collection)
    .where('createdAt', '<', secondsAgo(age))
    .get();
  console.log(`Purging ${snap.size} ${collection}s`);
  snap.docs.forEach(doc => batch.delete(doc.ref));
};

const isMemory = (
  value: unknown,
): value is typeof functions.VALID_MEMORY_OPTIONS[number] =>
  functions.VALID_MEMORY_OPTIONS.some(o => o === value);

export const purgeStaleDocuments = functions
  .region(process.env.CLOUD_FUNCTION_REGION ?? 'us-central1')
  .runWith({
    timeoutSeconds: process.env.CLOUD_FUNCTION_TIMEOUT_SECONDS
      ? parseInt(process.env.CLOUD_FUNCTION_TIMEOUT_SECONDS, 10)
      : 300,
    memory: isMemory(process.env.CLOUD_FUNCTION_MEMORY)
      ? process.env.CLOUD_FUNCTION_MEMORY
      : '1GB',
  })
  .pubsub.schedule(
    process.env.CLOUD_FUNCTION_SCHEDULE ?? 'every 15 minutes',
  )
  .onRun(async () => {
    const batch = db.batch();

    await queuePurge(batch, 'idtoken', 24 * 60 * 60); // 24 hours
    await queuePurge(batch, 'contexttoken', 24 * 60 * 60); // 24 hours
    await queuePurge(batch, 'accesstoken', 1 * 60 * 60); // 1 hour
    await queuePurge(batch, 'nonce', 60); // 1  minute (LTIJS' MongoDB provider purges in 10 seconds, but we'll allow more time in case of network latency)
    await queuePurge(batch, 'state', 10 * 60); // 10 minutes

    return batch.commit();
  });
