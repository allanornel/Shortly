CREATE TABLE "users" (
	"id" serial PRIMARY KEY,
	"name" TEXT NOT NULL,
	"email" TEXT NOT NULL UNIQUE,
	"password" TEXT NOT NULL,
	"createdAt" TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT NOW()
);



CREATE TABLE "sessions" (
	"id" serial PRIMARY KEY,
	"userId" integer NOT NULL REFERENCES "users"(id),
	"token" TEXT NOT NULL,
	"createdAt" TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT NOW()
);



CREATE TABLE "links" (
	"id" serial PRIMARY KEY,
	"url" TEXT NOT NULL,
	"shortUrl" TEXT NOT NULL,
	"visitCount" serial NOT NULL,
	"createdAt" TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT NOW(),
	"userId" integer NOT NULL REFERENCES "users"(id)
);
