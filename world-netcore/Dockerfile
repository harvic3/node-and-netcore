FROM mcr.microsoft.com/dotnet/core/sdk:3.1 AS build-env
WORKDIR /home/app

# Copy csproj and restore as distinct layers
COPY *.csproj ./
RUN dotnet restore

# Copy everything else and build
COPY . ./
RUN dotnet publish -c Test -o /home/app/out

# Build runtime image
FROM mcr.microsoft.com/dotnet/core/aspnet:3.1
WORKDIR /home/app
COPY --from=build-env /home/app/out .
ENTRYPOINT ["dotnet", "world-netcore.dll"]