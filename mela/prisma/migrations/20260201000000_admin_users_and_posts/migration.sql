-- BismillahirRahmanirRahim
-- El Hamdu Lillahi Rabbul Alemin
-- Admin kullanıcı yönetimi ve paylaşım yönetimi için ek alanlar.

-- Kullanıcılar engellenebilsin (engellenen kullanıcı giriş yapamaz)
ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "blocked" BOOLEAN NOT NULL DEFAULT false;

-- Paylaşımlar yumuşak silinsin (admin geri alabilir)
ALTER TABLE "Car" ADD COLUMN IF NOT EXISTS "deletedAt" TIMESTAMP(3);

CREATE INDEX IF NOT EXISTS "Car_deletedAt_idx" ON "Car"("deletedAt");
