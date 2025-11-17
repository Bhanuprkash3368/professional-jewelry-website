/**
 * Professional Jewelry Catalog
 * Complete catalog of all available jewelry with models and thumbnails
 */

class JewelryCatalog {
    constructor() {
        this.catalog = {
            earrings: [
                {
                    id: 'diamond-earring',
                    name: 'Diamond Earrings',
                    description: 'Elegant diamond stud earrings',
                    color: 0xFFD700,
                    stone: 'Diamond',
                    price: '$299',
                    model: 'assets/models/earrings/diamond-earring.glb',
                    thumbnail: 'assets/thumbnails/earrings/diamond-earring.png',
                    rating: 4.8,
                    reviews: 245
                },
                {
                    id: 'ruby-earring',
                    name: 'Ruby Earrings',
                    description: 'Stunning ruby drop earrings',
                    color: 0xFF1493,
                    stone: 'Ruby',
                    price: '$349',
                    model: 'assets/models/earrings/ruby-earring.glb',
                    thumbnail: 'assets/thumbnails/earrings/ruby-earring.png',
                    rating: 4.9,
                    reviews: 189
                },
                {
                    id: 'sapphire-earring',
                    name: 'Sapphire Earrings',
                    description: 'Beautiful sapphire gemstone earrings',
                    color: 0x0000FF,
                    stone: 'Sapphire',
                    price: '$329',
                    model: 'assets/models/earrings/sapphire-earring.glb',
                    thumbnail: 'assets/thumbnails/earrings/sapphire-earring.png',
                    rating: 4.7,
                    reviews: 156
                }
            ],
            necklaces: [
                {
                    id: 'diamond-necklace',
                    name: 'Diamond Necklace',
                    description: 'Classic diamond pendant necklace',
                    color: 0xFFD700,
                    stone: 'Diamond',
                    price: '$599',
                    model: 'assets/models/necklaces/diamond-necklace.glb',
                    thumbnail: 'assets/thumbnails/necklaces/diamond-necklace.png',
                    rating: 4.9,
                    reviews: 312
                },
                {
                    id: 'emerald-necklace',
                    name: 'Emerald Necklace',
                    description: 'Luxurious emerald pendant necklace',
                    color: 0x00FF00,
                    stone: 'Emerald',
                    price: '$649',
                    model: 'assets/models/necklaces/emerald-necklace.glb',
                    thumbnail: 'assets/thumbnails/necklaces/emerald-necklace.png',
                    rating: 4.8,
                    reviews: 267
                },
                {
                    id: 'pearl-necklace',
                    name: 'Pearl Necklace',
                    description: 'Elegant pearl strand necklace',
                    color: 0xFFFFF0,
                    stone: 'Pearl',
                    price: '$449',
                    model: 'assets/models/necklaces/pearl-necklace.glb',
                    thumbnail: 'assets/thumbnails/necklaces/pearl-necklace.png',
                    rating: 4.7,
                    reviews: 198
                }
            ],
            rings: [
                {
                    id: 'diamond-ring',
                    name: 'Diamond Ring',
                    description: 'Timeless diamond solitaire ring',
                    color: 0xFFD700,
                    stone: 'Diamond',
                    price: '$799',
                    model: 'assets/models/rings/diamond-ring.glb',
                    thumbnail: 'assets/thumbnails/rings/diamond-ring.png',
                    rating: 4.9,
                    reviews: 456
                },
                {
                    id: 'ruby-ring',
                    name: 'Ruby Ring',
                    description: 'Stunning ruby gemstone ring',
                    color: 0xFF1493,
                    stone: 'Ruby',
                    price: '$899',
                    model: 'assets/models/rings/ruby-ring.glb',
                    thumbnail: 'assets/thumbnails/rings/ruby-ring.png',
                    rating: 4.8,
                    reviews: 334
                },
                {
                    id: 'sapphire-ring',
                    name: 'Sapphire Ring',
                    description: 'Beautiful sapphire engagement ring',
                    color: 0x0000FF,
                    stone: 'Sapphire',
                    price: '$949',
                    model: 'assets/models/rings/sapphire-ring.glb',
                    thumbnail: 'assets/thumbnails/rings/sapphire-ring.png',
                    rating: 4.9,
                    reviews: 289
                }
            ]
        };
    }

    /**
     * Get all jewelry items
     */
    getAllItems() {
        return {
            earrings: this.catalog.earrings,
            necklaces: this.catalog.necklaces,
            rings: this.catalog.rings
        };
    }

    /**
     * Get items by type
     */
    getItemsByType(type) {
        return this.catalog[type] || [];
    }

    /**
     * Get item by ID
     */
    getItemById(id) {
        for (const type in this.catalog) {
            const item = this.catalog[type].find(i => i.id === id);
            if (item) return item;
        }
        return null;
    }

    /**
     * Get featured items
     */
    getFeaturedItems() {
        return {
            earrings: this.catalog.earrings[0],
            necklaces: this.catalog.necklaces[0],
            rings: this.catalog.rings[0]
        };
    }

    /**
     * Get top rated items
     */
    getTopRatedItems() {
        const all = [
            ...this.catalog.earrings,
            ...this.catalog.necklaces,
            ...this.catalog.rings
        ];
        return all.sort((a, b) => b.rating - a.rating).slice(0, 6);
    }
}

export default JewelryCatalog;

