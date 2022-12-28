import {getDmzKeysFromWords} from "../ocr.js";

describe('ocr', () => {

    test('should return an array with DMZ keys that match words passed in', () => {
        const result = getDmzKeysFromWords(['TRAVELER\'S'])

        expect(result).toContain('Traveler\'s Luggage')
    })

    test('should return DMZ keys where there are DMZ keys similarly named', () => {
        const result = getDmzKeysFromWords([
            "TOOLBOX",
            "BANK",
            "OF",
            "ADAL",
            "CANAL",
            "-",
            "ANTIQUITIES",
            "STORE",
            "OFFICE",
            "-",
            "STORE",
            "OFFICE",
            "-",
            "KEY",
            "TOP",
            "STORY",
            "APARTMENT",
            "103"])

        expect(result).toContain('Bank of Adal Top Story Office')
    })

    test('should match "downtown post office" and not "downtown post office secure room" when it\'s not the secure room', () => {
        const result = getDmzKeysFromWords([
            "DOWNTOWN",
            "POST",
            "OFFICE",
            // ...
            "TRAVELER'S",
            "ROOM",
        ])

        expect(result).not.toContain('Downtown Post Office Secure Room')
        expect(result).toContain('Downtown Post Office')
    })

    test('should match "control tower" and not "control room" when it\'s clearly control tower', () => {
        const result = getDmzKeysFromWords([
            "CONTROL",
            "TOWER",
            "DOWNTOWN",
            "FORT",
            "BARRACK",
            "LONGSHOREMAN'",
            "MAWIZEH",
            "CELL",
            "DOCK",
            "SHACK",
            "KEY",
            "KEY",
            "-",
            "WORN",
            "POST",
            "OFFICE",
            "KEY",
            "S",
            "DUFFEL",
            "BAG",
            "SHOP",
            "KEY",
            "=",
            "E",
            "=",
            "=",
            "E",
            "=",
            "BUNGALOW",
            "POLICE",
            "ACADEMY",
            "POLICE",
            "ACADEMY",
            "SCIENTIST'S",
            "TARAQ",
            "RIVER",
            "TRAVELER'S",
            "ROOM",
        ])

        expect(result).not.toContain('Control Room')
        expect(result).toContain('Control Tower')
    });

    test('should not match "locker" to specific police lockers when it\'s the Police Locker Room', () => {
        const result = getDmzKeysFromWords([
            "POLICE",
            "ACADEMY",
            "POLICE",
            "ACADEMY",
            "SCIENTIST'S",
            "TARAQ",
            "RIVER",
            "TRAVELER'S",
            "ROOM",
            "KEY",
            "KEY",
            "PRIVATE",
            "LOCKER",
            "LOCKER",
        ])

        expect(result).not.toContain('Police Locker [F2]')
        expect(result).toContain('Police Academy Private Locker Room')
    });

    test('should not return `null` ever', () => {
        const result = getDmzKeysFromWords([
            "POLICE",
            "ACADEMY",
            "POLICE",
            "ACADEMY",
            "SCIENTIST'S",
            "TARAQ",
            "RIVER",
            "TRAVELER'S",
            "ROOM",
            "KEY",
            "KEY",
            "PRIVATE",
            "LOCKER",
            "LOCKER",
        ])

        expect(result).not.toContain(null)
    });

})
