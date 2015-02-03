/* Find the array[i] = i in a sorted array of integers
 * Three Solutions:Linear Search, Binary Search, Recursive Binary Search
 */

public class FindMagicIndex {
	public static void main(String[] args) {
		// TODO Auto-generated method stub
		int [] array = {1,3,4,4,5,5,8};
		FindMagicIndex index = new FindMagicIndex();
		System.out.print(index.findMagicIndex(array));
		System.out.print(index.binarySearchMagicIndex(array));
		System.out.print(index.recursiveBinarySearchMagicIndex(array));
	}
	
	public int findMagicIndex(int [] array) {
		for (int i = 0; i < array.length; i++) {
			if (array[i] == i) {
				return i;
			}
		}
		
		return -1;
	}
	
	public int binarySearchMagicIndex(int [] array) {
		int start = 0;
		int end = array.length - 1;
		
		while (start <= end) {
			int mid = (start + end) / 2;
			
			if (array[mid] == mid) {
				return mid;
			} else if (array[mid] > mid) {
				start = mid + 1;
			} else {
				end = mid - 1;
			}
		}
		
		return -1;
	}
	
	public int recursiveBinarySearchMagicIndex(int [] array) {
		return recursive(array, 0, array.length);
	}
	
	public int recursive (int [] array, int start, int end) {
		int mid = (start + end) / 2;
		
		if (end < start || start < 0 || end > array.length) {
			return -1;
		}
		
		if (array[mid] == mid) {
			return mid;
		} else if (array[mid] > mid) {
			return recursive(array, mid + 1, end);
		} else {
			return recursive(array, start, mid - 1);
		}
	}
}
