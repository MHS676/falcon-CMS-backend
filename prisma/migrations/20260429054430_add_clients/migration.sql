-- CreateTable
CREATE TABLE "bts" (
    "id" SERIAL NOT NULL,
    "slNo" INTEGER,
    "airtelCode" TEXT,
    "robiCode" TEXT,
    "siteType" TEXT,
    "district" TEXT,
    "thana" TEXT,
    "address" TEXT,
    "securityVendor" TEXT,
    "serviceType" TEXT,
    "posts" INTEGER,
    "persons" INTEGER,
    "deploymentDate" TEXT,
    "guardNames" TEXT,
    "inchargeNames" TEXT,
    "remarks" TEXT,
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "bts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "clients" (
    "id" SERIAL NOT NULL,
    "slNo" INTEGER,
    "name" TEXT NOT NULL,
    "location" TEXT,
    "address" TEXT,
    "contactPerson" TEXT,
    "contactNo" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "clients_pkey" PRIMARY KEY ("id")
);
