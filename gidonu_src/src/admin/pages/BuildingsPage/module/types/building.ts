export default interface Building {
    type: 'building',
    id: number,
    title: string,
    address: string | null,
    floor_amount: number,
    description: string | null
};