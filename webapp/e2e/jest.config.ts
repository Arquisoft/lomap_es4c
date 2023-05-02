export default {
    transform: {
        "^.+\\.tsx?$": "ts-jest"
    },
    testMatch: ["**/steps/*.ts"],
    moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
    moduleNameMapper:{"^uuid$": "uuid"},
    preset: "jest-puppeteer",
    collectCoverage: true,
    collectCoverageFrom: ["../build/static/js/**"],
    testTimeout: 30000
}